const mysql = require("mysql2/promise");
const mySqlCredentials = require("../shared/environment.development");

async function getContest(id) {
    const db = await mysql.createConnection(mySqlCredentials);
    try {
        const [results] = await db.query(
            'SELECT * FROM `Contests` WHERE `id` = ?', [id]);
        return (results.length === 0)? [] : results;
    } catch (err) {
        console.log(err);
    } finally {
        await db.end();
    }
}

async function getContests(req,scores,contestantId) {
    const { _page, _limit, _sort, _order, name_like } = req.query;

    const page = parseInt(_page) || 1;
    const limit = parseInt(_limit) || 10;
    const offset = (page - 1) * limit;

    const allowedSortColumns = ['name', 'id'];
    (scores)?allowedSortColumns.push('score'):'';
    const sortColumn = allowedSortColumns.includes(_sort) ? _sort : 'id';
    const sortDirection = _order === 'desc' ? 'DESC' : 'ASC';

    let sql;
    if (scores)
        sql = 'SELECT C.id, C.name, C.startAt, C.finishAt, Contestant.score FROM Contests C JOIN Contestant on Contestant.contest = C.id';
    else
        sql = 'SELECT id, name, startAt, finishAt FROM Contests WHERE 1=1';

    const queryParams = [];
    if (scores) {
        sql += ` AND Contestant.id = ${contestantId}`;
    }

    if (name_like) {
        sql += ` AND name LIKE ?`;
        queryParams.push(`%${name_like}%`);
    }

    sql += ` ORDER BY ${sortColumn} ${sortDirection}`;

    sql += ` LIMIT ${limit} OFFSET ${offset}`;

    const db = await mysql.createConnection(mySqlCredentials);
    try {
        const [results] = await db.query(sql, queryParams);
        let total;
        if (scores){
            [total] = await db.query('SELECT * FROM Contestant WHERE id=?', [ contestantId ]);
        }
        else {
            [total] = await db.query('SELECT * FROM `Contests`');
        }
        return [results, total.length];
    } catch (error) {
        console.log(error);
        return {};
    } finally {
        await db.end();
    }
}
async function postContest(args) {
    const {name: nameC, startAt: startC, finishAt: finishC }= args;

    const db = await mysql.createConnection(mySqlCredentials);
    const [total] = await db.query('SELECT * FROM `Contests`');
    let lastId = total
        .sort((a, b) => b.id - a.id)[0].id;
    lastId = lastId + 1;
    try {
        await db.query('INSERT INTO Contests(id,name,startAt,finishAt) VALUES (?,?,?,?)', [lastId,nameC,startC,finishC]);
        return await getContest(lastId);
    } catch (err) {
        console.log(err);
    } finally {
        await db.end();
    }
}
async function editContest(id, body) {
    const {name: nameC, startAt: startC, finishAt: finishC } = body;

    const db = await mysql.createConnection(mySqlCredentials);
    try {
    const [total] = await db.query('UPDATE Contests SET name=?,startAt=?,finishAt=? WHERE id=?',
        [nameC, startC, finishC, id]);
    return await getContest(id);
    } catch (err) {
        console.log(err);
    } finally {
        await db.end();
    }
}
async function deleteContest(id) {
    const db = await mysql.createConnection(mySqlCredentials);
    try {
        await db.query('DELETE FROM Contestant WHERE contest=?', [id]);
        await db.query('DELETE FROM Contests WHERE id=?', [id]);
    } catch (err) {
        console.log(err);
    } finally {
        await db.end();
    }
}




module.exports = { getContest, getContests, postContest, editContest, deleteContest };