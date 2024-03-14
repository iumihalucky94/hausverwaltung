const mariadb = require('mariadb');
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
        console.log(res); // Log the result
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
        return rows;
    } catch (err) {
        console.error(err);
        return [];
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
        console.log(parseInt(checkResult['count']) > 0)

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
    console.log(data)
    let conn;
    try {
        conn = await pool.getConnection();
        let rows = await conn.query(`UPDATE objects SET object_id='${data.object_id}', street='${data.street}', house_nr='${data.house_nr}', plz='${data.plz}', notes='${data.notes}' WHERE id=${data.id}`);
        console.log(rows.affectedRows)
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




module.exports = { insertIntoSuppliers, checkEmailExists, getAllSuppliers, insertObject, getAllObjects, updateObject, getObjectByID, deleteObecject };
