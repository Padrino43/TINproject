const mysql = require("mysql2/promise");
const mySqlCredentials = require("../shared/environment.development");

async function getUsers() {
    const db = await mysql.createConnection(mySqlCredentials);
    try {
        const [results] = await db.query(
            'SELECT * FROM `User`');
        return (results.length === 0)? null : results;
    } catch (err) {
        console.log(err);
    } finally {
        db.end();
    }
}

module.exports = { getUsers };