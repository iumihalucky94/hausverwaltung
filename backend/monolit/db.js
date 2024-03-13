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
        const rows = await conn.query("SELECT * FROM suppliers");
        return rows;
    } catch (err) {
        console.error(err);
        return [];
    } finally {
        if (conn) conn.end();
    }
}





module.exports = { insertIntoSuppliers, checkEmailExists, getAllSuppliers };
