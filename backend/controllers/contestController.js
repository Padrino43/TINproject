const mysql = require("mysql2/promise");
const mySqlCredentials = require("../shared/environment.development");

async function getContest(id) {
    const db = await mysql.createConnection(mySqlCredentials);
    try {
        const [results] = await db.query(
            'SELECT * FROM `Contests` WHERE `Id` = ?', [id]);
        return (results.length === 0)? {} : results;
    } catch (err) {
        console.log(err);
    } finally {
        await db.end();
    }
}

async function getContests(req) {
    const { _page, _limit, _sort, _order, name_like } = req.query;

    // Przekształć _page i _limit na liczby
    const page = parseInt(_page) || 1;
    const limit = parseInt(_limit) || 10;
    const offset = (page - 1) * limit;

    // Zabezpieczenie przed wstrzykiwaniem danych: Lista dozwolonych kolumn
    const allowedSortColumns = ['name', 'start', 'finish'];
    const sortColumn = allowedSortColumns.includes(_sort) ? _sort : 'name';
    const sortDirection = _order === 'desc' ? 'DESC' : 'ASC';

    // Budowanie zapytania SQL
    let sql = 'SELECT id, name, start, finish FROM Contests WHERE 1=1';

    // Dodanie filtra po firstname_like
    const queryParams = [];
    if (name_like) {
        sql += ` AND name LIKE ?`;
        queryParams.push(`%${name_like}%`); // Wartość LIKE z wildcards
    }

    // Dodanie sortowania
    sql += ` ORDER BY ${sortColumn} ${sortDirection}`;

    // Dodanie limitu i offsetu
    sql += ` LIMIT ${limit} OFFSET ${offset}`;

    const db = await mysql.createConnection(mySqlCredentials);
    try {
        const [results] = await db.query(sql, queryParams);
        return results;
    } catch (error) {
        console.log(error);
        return {};
    } finally {
        await db.end();
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
        await db.end();
    }
}




module.exports = { getContest, getContests, postContest };