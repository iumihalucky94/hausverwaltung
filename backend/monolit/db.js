const { request } = require('express');
const mariadb = require('mariadb');
let { getTaskIdByName, getGroupIdByName, convertDate, dateTimeConvertor } = require('./utilities.js');
require('dotenv').config();

const pool = mariadb.createPool({
    host: process.env.DB_IP,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit: 5
});

// <===================== SUPPLIERS =====================>

async function insertIntoSuppliers(data) {
    let conn;
    try {
        conn = await pool.getConnection();
        const res = await conn.query("INSERT INTO suppliers (name, email, date_created) VALUES (?, ?, NOW())", [data.supplier_name, data.supplier_email]);
        return true;
    } catch (err) {
        console.error(err);
        return false;
    } finally {
        if (conn) conn.end();
    }
}
// Function to check if email already exists in the database
async function checkEmailExists(email) {
    let conn;
    try {
        // const [rows] = await pool.query('SELECT COUNT(*) AS count FROM suppliers WHERE email = ?', [email]);
        conn = await pool.getConnection();
        let existStatement = `EXISTS(SELECT * FROM suppliers WHERE email ='${email}')`
        let checkEmail = await conn.query(`SELECT ${existStatement}`)
        // response might be even 0 or 1 -> 0 -means no duplicated rows
        let checkEmailDuplicatedValue = checkEmail[0][existStatement]
        return checkEmailDuplicatedValue > 0;
    } catch (error) {
        // console.error('Error checking email existence:', error);
        return false; // Return false in case of an error
    } finally {
        if (conn) conn.end();
    }
}

async function getAllSuppliers() {
    let conn;
    try {
        conn = await pool.getConnection();
        let rows = await conn.query("SELECT * FROM suppliers");
        return { success: true, message: rows };
    } catch (err) {
        console.error(err);
        return { success: false, message: err };
    } finally {
        if (conn) conn.end();
    }
}
// <===================== SUPPLIERS END =====================>

// <===================== OBJECTS =====================>

async function insertObject(data) {
    let conn;
    try {
        let { object_id, street, house_nr, plz, notes } = data;
        conn = await pool.getConnection();

        // Check if object_id already exists
        let checkSql = 'SELECT COUNT(*) AS count FROM objects WHERE object_id = ?';
        let [checkResult] = await conn.query(checkSql, [object_id.trim()]);

        if (parseInt(checkResult['count']) > 0) {
            // Object_id already exists
            return { success: false, message: `A record with ID:${object_id} already exists.` };
        } else {
            // Proceed with insertion since object_id does not exist
            let insertSql = `INSERT INTO objects (object_id, street, house_nr, plz, notes) VALUES (?, ?, ?, ?, ?)`;
            let values = [object_id, street, house_nr, plz, notes];
            await conn.query(insertSql, values);
            return { success: true, message: 'Record inserted successfully.' };
        }
    } catch (err) {
        console.error('Error executing insertObject:', err);
        return { success: false, message: 'An error occurred during the operation.' };
    } finally {
        if (conn) conn.release(); // Ensure the connection is released back to the pool
    }
}

async function updateObject(data) {
    let conn;
    try {
        conn = await pool.getConnection();
        let rows = await conn.query(`UPDATE objects SET object_id='${data.object_id}', street='${data.street}', house_nr='${data.house_nr}', plz='${data.plz}', notes='${data.notes}' WHERE id=${data.id}`);
        return rows;
    } catch (err) {
        console.error(err);
        return [];
    } finally {
        if (conn) conn.end();
    }
}

async function getAllObjects() {
    let conn;
    try {
        conn = await pool.getConnection();
        let rows = await conn.query("SELECT object_id, street, house_nr, plz, notes FROM objects");
        return rows;
    } catch (err) {
        console.error(err);
        return [];
    } finally {
        if (conn) conn.end();
    }
}

async function getObjectByID(objectID) {
    let conn;
    try {
        conn = await pool.getConnection();
        let rows = await conn.query(`SELECT * FROM objects WHERE object_id='${objectID}'`);
        return rows[0];
    } catch (err) {
        console.error(err);
        return [];
    } finally {
        if (conn) conn.end();
    }
}

async function deleteObecject(objectID) {
    let conn;
    // DELETE FROM objects WHERE object_id='qqqq qq'
    try {
        conn = await pool.getConnection();
        let rows = await conn.query(`DELETE FROM objects WHERE object_id='${objectID}'`);
        return rows.affectedRows;
    } catch (err) {
        console.error(err);
        return [];
    } finally {
        if (conn) conn.end();
    }
}

// <===================== OBJECTS END =====================>

// <===================== TASK & GROUPS =====================>

// Function to check if email already exists in the database
async function checkGroupTaskExists(data) {
    let conn;
    let tableName = ''
    let colName = ''
    if (data.gt == 'Groups') {
        tableName = 'groups'
        colName = 'group_name'
    } else if (data.gt === 'Tasks') {
        tableName = 'tasks'
        colName = 'task_name'
    }
    try {
        conn = await pool.getConnection();
        let existStatement = `EXISTS(SELECT * FROM ${tableName} WHERE ${colName} ='${data.nameInput}')`
        let checkDuplicated = await conn.query(`SELECT ${existStatement}`)
        // response might be even 0 or 1 -> 0 -means no duplicated rows
        let checkDuplicatedValue = checkDuplicated[0][existStatement]
        return checkDuplicatedValue > 0;
    } catch (error) {
        console.error('Error checking name existence:', error);
        return false; // Return false in case of an error
    } finally {
        if (conn) conn.end();
    }
}

async function createGroupTask(data) {
    let x = await checkGroupTaskExists(data)
    if (!x) {
        let conn;
        if (data.gt == 'Groups') {
            try {
                conn = await pool.getConnection();
                let rows = await conn.query(`INSERT INTO groups (group_name) VALUES ('${data.nameInput}')`)
                return ({ success: true, message: rows })
            } catch (error) {
                console.error(err);
                return ({ success: false, message: 'Something went wrong with DB connection in function createGroup' })
            } finally {
                if (conn) conn.end()
            }
        } else if (data.gt == "Tasks") {
            try {
                conn = await pool.getConnection();
                let rows = await conn.query(`INSERT INTO tasks (task_name, group_id) VALUES ('${data.nameInput}',(SELECT group_id FROM groups WHERE group_name='${data.group_name}'))`)
                return ({ success: true, message: rows })
            } catch (error) {
                console.error(err);
                return ({ success: false, message: 'Something went wrong with DB connection in function createGroup' })
            } finally {
                if (conn) conn.end()
            }
        }
    } else {
        return ({ success: false, message: 'Record with this name already exists, or we have have issue with DB' })
    }
}

async function listGroups() {
    let conn;
    try {
        conn = await pool.getConnection();
        let rows = await conn.query("SELECT * FROM groups");
        return ({ success: true, message: rows })
    } catch (err) {
        console.error(err);
        return ({ success: false, message: 'Something went wrong with DB connection in function listGroups' })
    } finally {
        if (conn) conn.end();
    }
}
async function listTasks() {
    let conn;
    try {
        conn = await pool.getConnection();
        let rows = await conn.query("SELECT * FROM tasks");
        return ({ success: true, message: rows })
    } catch (err) {
        console.error(err);
        return ({ success: false, message: 'Something went wrong with DB connection in function listGroups' })
    } finally {
        if (conn) conn.end();
    }
}

async function list_tasks_groups() {
    let conn;
    try {
        conn = await pool.getConnection();
        // Modified to use LEFT JOIN to include groups without tasks
        let rows = await conn.query(`
            SELECT g.group_name, t.task_name 
            FROM groups g 
            LEFT JOIN tasks t ON t.group_id = g.group_id 
            ORDER BY g.group_id, t.task_id
        `);
        let groupedTasks = rows.reduce((acc, { group_name, task_name }) => {
            acc[group_name] = acc[group_name] || [];
            // Only add task_name if it is not null
            if (task_name) {
                acc[group_name].push(task_name);
            }
            return acc;
        }, {});
        return ({ success: true, message: groupedTasks })
    } catch (error) {
        console.error(error); // Fixed variable name from err to error
        return ({ success: false, message: 'Something went wrong with DB connection in function list_tasks_groups' })
    } finally {
        if (conn) conn.end();
    }
}

// <===================== TASK & GROUPS END =====================>

// <===================== MANDANT =====================>

async function createMandant(data) {
    // Convert send_date and deadline from "DD.MM.YYYY, HH:MM:SS" or "DD.MM.YYYY" to "YYYY-MM-DD HH:MM:SS" or "YYYY-MM-DD"
    if (data.send_date) {
        data.send_date = convertDate(data.send_date);
    }
    if (data.deadline) {
        data.deadline = convertDate(data.deadline);
    }

    // Fetching group_id and task_id using the provided names
    if (data.group_name) {
        data.group_id = await getGroupIdByName(data.group_name);
        if (!data.group_id) { return { success: false, message: 'Task name not found' }; }
        delete data.group_name;
    }
    if (data.task_name) {
        data.task_id = await getTaskIdByName(data.task_name);
        if (!data.task_id) { return { success: false, message: 'Task name not found' }; }
        delete data.task_name
    }
    // Ensure essential fields are present
    if (!data.object_id || !data.group_id || !data.task_id || !data.supplier_id || Object.keys(data).length < 4) {
        return { success: false, message: 'Missing required fields, such as object_id, group_id, task_id, supplier_id' };

    }
    let conn;
    try {
        conn = await pool.getConnection();

        // Check if a mandant record with this group_id and task_id exists
        const checkQuery = `SELECT * FROM mandant WHERE group_id = ? AND task_id = ? LIMIT 1`;
        const existingRecords = await conn.query(checkQuery, [data.group_id, data.task_id]);

        if (existingRecords.length > 0) {
            // Record exists, update it
            const updateColumns = Object.keys(data).map(key => `${key} = ?`).join(', ');
            const updateValues = Object.values(data);
            const updateQuery = `UPDATE mandant SET ${updateColumns} WHERE group_id = ? AND task_id = ?`;

            // Append group_id and task_id at the end for the WHERE clause
            updateValues.push(data.group_id, data.task_id);
            await conn.query(updateQuery, updateValues);
            return { success: true, message: 'Data updated successfully' };
        } else {
            // No existing record, insert new one
            const columns = Object.keys(data).join(', ');
            const placeholders = Object.keys(data).map(() => '?').join(', ');
            const values = Object.values(data);
            const insertQuery = `INSERT INTO mandant (${columns}) VALUES (${placeholders})`;
            await conn.query(insertQuery, values);
            return { success: true, message: 'Data inserted successfully' };
        }
    } catch (error) {
        console.error('Error:', error);
        return { success: false, message: 'Something went wrong with the DB connection', error: error };
    } finally {
        if (conn) conn.end();
    }
}

async function listMandant(data) {
    let conn;
    try {
        conn = await pool.getConnection();
        let key = Object.keys(data)[0];
        let value = data[key];
        let rows = await conn.query(`SELECT * FROM mandant WHERE ${key} = ?`, [value]);
        for (let item of rows) {
            // if (item.send_date) { item.send_date = dateTimeConvertor('datetime', item.send_date) }
            // if (item.deadline) { item.deadline = dateTimeConvertor('date', item.deadline) }
            if (item.task_id) {
                let taskResult = await conn.query(`SELECT task_name FROM tasks WHERE task_id = ?`, [item.task_id]);
                if (taskResult.length > 0) {
                    item.task_name = taskResult[0].task_name; // Correctly assign task_name to the item
                } else {
                    return ({ success: false, message: 'Something went wrong with DB connection in function listMandant 2' })
                }
                rows['task_name']
                delete item.task_id
            }
        }
        return ({ success: true, message: rows })
    } catch (err) {
        console.error(err);
        return ({ success: false, message: 'Something went wrong with DB connection in function listMandant' })
    } finally {
        if (conn) conn.end();
    }
}

async function changeMandantStatus(data) {
    let conn;
    let updateValue;
    try {
        conn = await pool.getConnection();
        let request = `SELECT * FROM mandant 
                       WHERE task_id = (SELECT task_id FROM tasks WHERE task_name = ?) 
                       AND group_id = (SELECT group_id FROM groups WHERE group_name = ?) 
                       AND object_id = ? 
                       LIMIT 1`;
        let result = await conn.query(request, [data.task_name, data.group_name, data.object_id]);
        if (!result) {
            return ({ success: false, message: 'For some reason now records found in DB for this statement' })
        }
        if (result[0].status) {

            switch (result[0].status) {
                case 'Active':
                    updateValue = 'Disable'
                    break;
                case 'Disable':
                    updateValue = 'Active'
                    break;
            }

            let updateRequest = `UPDATE mandant
                            SET status = ?
                            WHERE mandant_id = ?
                            `
            let resultUpdate = await conn.query(updateRequest, [updateValue, result[0].mandant_id]);
            if (resultUpdate.affectedRows > 0) {
                return ({ success: true, message: 'Record status value has been updated successfully!', value: updateValue })
            } else {
                return ({ success: false, message: 'Something went wrong with DB connection in function listMandant' })
            }
        }


    } catch (error) {
        console.error(error);
        return ({ success: false, message: 'Something went wrong with DB connection in function listMandant' })
    } finally {
        if (conn) conn.end();
    }
}

// <===================== MANDANT END =====================>

module.exports = { insertIntoSuppliers, checkEmailExists, getAllSuppliers, insertObject, getAllObjects, updateObject, getObjectByID, deleteObecject, createGroupTask, listGroups, listTasks, list_tasks_groups, createMandant, listMandant, changeMandantStatus };
