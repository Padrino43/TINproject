const mysql = require("mysql2/promise");
const mySqlCredentials = require("../shared/environment.development");

async function getContestant(id) {
    const db = await mysql.createConnection(mySqlCredentials);
    try {
        const [results] = await db.query(
            'SELECT P.id, P.name, P.surname,IFNULL(SUM(C.score),0) AS score, P.startingDate FROM Person P LEFT JOIN Contestant C ON C.id=P.id WHERE P.id = ?', [id]);
        return (results.length === 0 || results.id === null)? [] : results;
    } catch (err) {
        console.log(err);
    } finally {
        await db.end();
    }
}

async function getContestantsForForm() {

    let sql =
        'SELECT P.id, P.name, P.surname,IFNULL(SUM(C.score),0) AS score, P.startingDate FROM Person P LEFT JOIN Contestant C ON C.id=P.id GROUP BY P.id';

    const db = await mysql.createConnection(mySqlCredentials);
    try {
        const [results] = await db.query(sql);
        return [results];
    } catch (error) {
        console.log(error);
        return {};
    } finally {
        await db.end();
    }
}

async function postContestantsForForm(args) {
    const {id: idP, contest: nameC, score: scoreC }= args;
    const db = await mysql.createConnection(mySqlCredentials);

    try {
        await db.query('INSERT INTO Contestant(id,contest,score) VALUES (?,?,?)', [idP,nameC,scoreC]);
        return getContestant(idP);
    } catch (err) {
        console.log(err);
    } finally {
        await db.end();
    }
}
async function editContestantsForForm(id, body) {
    const {score: newScore } = body;

    const db = await mysql.createConnection(mySqlCredentials);
    try {
        await db.query('UPDATE Contestant SET score=? WHERE id=?',
            [newScore,id]);
        return await getContestant(id);
    } catch (err) {
        console.log(err);
    } finally {
        await db.end();
    }
}

async function getContestants(req, scores, contestId) {
    const { _page, _limit, _sort, _order, name_like } = req.query;

    const page = parseInt(_page) || 1;
    const limit = parseInt(_limit) || 10;
    const offset = (page - 1) * limit;

    const allowedSortColumns = ['name', 'surname'];
    (scores)?allowedSortColumns.push('score'):'';
    const sortColumn = allowedSortColumns.includes(_sort) ? _sort : 'id';
    const sortDirection = _order === 'desc' ? 'DESC' : 'ASC';

    let sql;
    if (scores)
    sql =
        'SELECT P.id, P.name, P.surname,C.score,P.startingDate FROM Person P LEFT JOIN Contestant C ON C.id=P.id WHERE 1=1';
    else
        sql =
            'SELECT id, name, surname, startingDate FROM Person WHERE 1=1';

    const queryParams = [];
    if (scores) {
        sql += ` AND C.contest = ${contestId}`;
    }

    if (name_like) {
        sql += ` AND surname LIKE ?`;
        queryParams.push(`%${name_like}%`);
    }

    sql += ` ORDER BY ${sortColumn} ${sortDirection}`;


    sql += ` LIMIT ${limit} OFFSET ${offset}`;

    const db = await mysql.createConnection(mySqlCredentials);
    try {
        const [results] = await db.query(sql, queryParams);
        let total;
        if(scores) {
            [ total ] = await db.query('SELECT * FROM Contestant WHERE contest=?', [ contestId ]);
        } else {
            [ total ] = await db.query('SELECT * FROM Person');
        }
        return [results, total.length];
    } catch (error) {
        console.log(error);
        return {};
    } finally {
        await db.end();
    }
}
async function postContestant(args) {
    const {name: nameC, surname: startC, startingDate: finishC }= args;

    const db = await mysql.createConnection(mySqlCredentials);
    const [total] = await db.query('SELECT * FROM `Person`');
    let lastId = total
        .sort((a, b) => b.id - a.id)[0].id;
    lastId = lastId + 1;
    try {
        await db.query('INSERT INTO Person(id,name,surname,startingDate) VALUES (?,?,?,?)', [lastId,nameC,startC,finishC]);
        return await getContestant(lastId);
    } catch (err) {
        console.log(err);
    } finally {
        await db.end();
    }
}
async function editContestant(id, body) {
    const {name: firstname, surname: surname, startingDate: startingAt } = body;

    const db = await mysql.createConnection(mySqlCredentials);
    try {
        await db.query('UPDATE Person SET name=?,surname=?,startingDate=? WHERE id=?',
            [firstname, surname, startingAt, id]);
        return await getContestant(id);
    } catch (err) {
        console.log(err);
    } finally {
        await db.end();
    }
}
async function deleteContestant(id) {
    const db = await mysql.createConnection(mySqlCredentials);
    try {
        await db.query('DELETE FROM Contestant WHERE id=?', [id]);
        await db.query('DELETE FROM Person WHERE id=?', [id]);
    } catch (err) {
        console.log(err);
    } finally {
        await db.end();
    }
}
async function deleteContestantFromContest(id, contestId) {
    const db = await mysql.createConnection(mySqlCredentials);
    try {
        await db.query('DELETE FROM Contestant WHERE id=? AND contest=?', [id, contestId]);
    } catch (err) {
        console.log(err);
    } finally {
        await db.end();
    }
}




module.exports = { getContestant, getContestants, postContestant, editContestant, deleteContestant, deleteContestantFromContest, getContestantsForForm, postContestantsForForm, editContestantsForForm };