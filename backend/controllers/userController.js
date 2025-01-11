const mysql = require("mysql2/promise");
const mySqlCredentials = require("../shared/environment.development");

async function getUsers() {
    const db = await mysql.createConnection(mySqlCredentials);
    try {
        const [results] = await db.query(
            'SELECT * FROM `User`');
        return (results.length === 0)? {} : results;
    } catch (err) {
        console.log(err);
    } finally {
        await db.end();
    }
}
async function addUser(req) {
    const {email: email, password: password, salt: salt }= req;
    let lastId = await getUsers()
        .then(data => {
            return data.sort((a, b) => b.id - a.id)[0].id;
        });
    lastId = lastId + 1;
    const db = await mysql.createConnection(mySqlCredentials);
    try {
        const [results] =  await
            db.query('INSERT INTO User(id,email,password,salt) VALUES (?,?,?,?)', [lastId,email,password,salt]);
        return (results.length === 0)? {} : results;
    } catch (err) {
        console.log(err);
    } finally {
        await db.end();
    }
}


module.exports = { getUsers, addUser };