const mysql = require("mysql2/promise");
const mySqlCredentials = require("../shared/environment.development");

async function getContest(id) {
    const db = await mysql.createConnection(mySqlCredentials);
    try {
        const [results] = await db.query(
            'SELECT * FROM `Contests` WHERE `Id` = ?', [id]);
        return (results.length === 0)? null : results;
    } catch (err) {
        console.log(err);
    } finally {
        db.end();
    }
}

async function getContests() {
    const db = await mysql.createConnection(mySqlCredentials);
    try {
        const [results] = await db.query('SELECT id,name,start,finish FROM `Contests`');
        return (results.length === 0)? null : results;
    } catch (err) {
        console.log(err);
    } finally {
        db.end();
    }
}
async function postContest(args) {
    const {name: nameC, start: startC, finish: finishC }= args;
    let lastId = await getContests()
        .then(data => {
            return data.sort((a, b) => b.id - a.id)[0].id;
        });
    lastId = lastId + 1;
    const db = await mysql.createConnection(mySqlCredentials);
    try {
        const [ results ] =
            await db.query('INSERT INTO Contests(id,name,start,finish) VALUES (?,?,?,?)', [lastId,nameC,startC,finishC]);
        return await getContest(results.insertId)
    } catch (err) {
        console.log(err);
    } finally {
        db.end();
    }
}




module.exports = { getContest, getContests, postContest };