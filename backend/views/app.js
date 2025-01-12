const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const { getContest, getContests, postContest, deleteContest, editContest } = require("../controllers/contestController");
const { getUsers, addUser } = require("../controllers/userController");
const {getContestants, getContestant, editContestant, deleteContestant, postContestant} = require("../controllers/contestantController");
const app = express();


app.use(express.json());
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    exposedHeaders: ['X-Total-Count']
}));

app.get("/users", async (req, res) => {
    let users  = await getUsers();
    res.json(users);
});
app.post("/users", async (req, res) => {
    let user  = await addUser(req.body);
    res.json(user);
});



app.get("/contests", async (req, res) => {
    let [contests, total]  = await getContests(req);
    res.header('X-Total-Count', total);
    res.json(contests);
});
app.get("/contests/:id", async (req, res) => {
    let { id }  = req.params;
    let [contest]  = await getContest(id);
    res.json(contest);
});
app.post("/contests", async (req, res) => {
    let contest  = await postContest(req.body);
    res.send(contest);
});
app.put("/contests/:id", async (req, res) => {
    let { id }  = req.params;
    let [contest]  = await editContest(id, req.body);
    res.json(contest);
});
app.delete("/contests/:id", async (req, res) => {
    let { id }  = req.params;
    await deleteContest(id);
    res.json({}).status(200)
});



app.get("/contestants", async (req, res) => {
    let [contestant, total]  = await getContestants(req);
    res.header('X-Total-Count', total);
    res.json(contestant);
});
app.get("/contestants/:id", async (req, res) => {
    let { id }  = req.params;
    let [contest]  = await getContestant(id);
    res.json(contest);
});
app.post("/contestants", async (req, res) => {
    let contest  = await postContestant(req.body);
    res.send(contest);
});
app.put("/contestants/:id", async (req, res) => {
    let { id }  = req.params;
    let [contest]  = await editContestant(id, req.body);
    res.json(contest);
});
app.delete("/contestants/:id", async (req, res) => {
    let { id }  = req.params;
    await deleteContestant(id);
    res.json({}).status(200)
});




app.get('*', async (req, res) => {
    res.json({});
});
app.listen( 3000, () => {
    console.log("http://localhost:3000");
});
