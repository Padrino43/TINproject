const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const express = require('express');
const { getContest, getContests, getContestsAllInfo, getContestAllInfo, postContest} = require("../controllers/contestController");
const {getUsers} = require("../controllers/userController");
const app = express();


app.use(express.json());
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

// async function test(){
//     const result = await getContest(15);
//     const results = await getContests();
//     const resultsAll = await getContestsAllInfo();
//     const resultAll = await getContestAllInfo(1);
//     console.log(resultAll);
// }

// test();

// const db = mysql.createConnection(mySqlCredentials);
//
// db.connect((err) => {
//     if (err) {
//         console.error('Database MySQL: ', err);
//         return;
//     }
//     console.log('Database MySQL: working');
// });


app.get("/contests", async (req, res) => {
    let contests  = await getContests();
    res.json(contests);
});
app.get("/users", async (req, res) => {
    let users  = await getUsers();
    res.json(users);
});
app.post("/contests", async (req, res) => {
    let contest  = await postContest(req.body);
    res.send(contest);
});
// app.get("/gunrange/new", async (req, res) => {
//   res.render('addGun');
// });
// app.post("/gunrange", async (req, res) => {
//   const { manufacturer, model, country} = await req.body;
//   let addedId = await addGun(manufacturer, model, country);
//   res.redirect(`/guns/${addedId}`);
// });
// app.get("/gunrange/:id", async (req, res) => {
//   const { id } = await req.params;
//   let gun = await getGun(id);
//   if(gun !== null)
//     res.render("gunDetails", { gun });
//   else
//     res.redirect("/guns");
// });
app.get('*', async (req, res) => {
    res.json();
});


app.listen( 3000, () => {
    console.log("http://localhost:3000");
});
