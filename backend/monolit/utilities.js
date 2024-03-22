const mariadb = require('mariadb');
// const { getTaskIdByName, getGroupIdByName, convertDate } = require('./utilities.js');
require('dotenv').config();

const pool = mariadb.createPool({
    host: process.env.DB_IP,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit: 5
});


async function getTaskIdByName(taskName) {
    let conn;
    try {
        conn = await pool.getConnection();
        const query = "SELECT task_id FROM tasks WHERE task_name = ?";
        const rows = await conn.query(query, [taskName]);
        if (rows.length > 0) {
            return rows[0].task_id; // Assuming task_name is unique
        } else {
            return null; // No task found
        }
    } catch (error) {
        console.error(error);
        throw error; // Rethrow or handle as appropriate
    } finally {
        if (conn) conn.end();
    }
}

async function getGroupIdByName(groupName) {
    let conn;
    try {
        conn = await pool.getConnection();
        const query = "SELECT group_id FROM groups WHERE group_name = ?";
        const rows = await conn.query(query, [groupName]);
        if (rows.length > 0) {
            return rows[0].group_id; // Assuming group_name is unique
        } else {
            return null; // No group found
        }
    } catch (error) {
        console.error(error);
        throw error; // Rethrow or handle as appropriate
    } finally {
        if (conn) conn.end();
    }
}

function convertDate(dateStr) {
    // Check if dateStr includes time
    if (dateStr.includes(',')) {
        // Assuming dateStr is in "DD.MM.YYYY, HH:MM:SS" format
        const parts = dateStr.split(', ');
        const date = parts[0].split('.').reverse().join('-');
        const time = parts[1];
        return `${date} ${time}`;
    } else {
        // Assuming dateStr is in "DD.MM.YYYY" format for dates without time
        return dateStr.split('.').reverse().join('-');
    }
}

function dateTimeConvertor(type, data) {
    let date = new Date(data);
    if (type == 'date') {
        // Use Intl.DateTimeFormat to format the date in Austrian local time
        let formatter = new Intl.DateTimeFormat('de-AT', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            timeZone: 'Europe/Vienna',
        });

        // Format the date
        let austrianDateTime = formatter.format(date);
        return austrianDateTime
    } else if (type == 'datetime') {
        // Use Intl.DateTimeFormat to format the date in Austrian local time
        let formatter = new Intl.DateTimeFormat('de-AT', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: 'Europe/Vienna',
        });

        // Format the date
        let austrianDateTime = formatter.format(date);
        return austrianDateTime
    }
}

module.exports = { convertDate, getGroupIdByName, getTaskIdByName, dateTimeConvertor }