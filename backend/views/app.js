const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const { getContest, getContests, postContest, deleteContest, editContest } = require("../controllers/contestController");
const { getUsers, addUser } = require("../controllers/userController");
const {getContestants, getContestant, editContestant, deleteContestant, postContestant, deleteContestantFromContest,
    getContestantsForForm, postContestantsForForm, editContestantsForForm
} = require("../controllers/contestantController");
const app = express();


app.use(express.json());
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    exposedHeaders: ['X-Total-Count','FromContestant','FromContest']
}));

app.get("/users", async (req, res) => {
    let users  = await getUsers();
    res.json(users);
});
app.post("/users", async (req, res) => {
    let user  = await addUser(req.body);
    if (user === null)
        res.status(409)
    else
        res.json(user);
    res.json(user);
});



app.get("/contests", async (req, res) => {
    let contests, total;
    if (req.get('With-Scores') === 'yes') {
        [contests, total]  = await getContests(req, true, Number(req.get('FromContestant').trim().replace(/^'(.*)'$/, '$1')));
    } else {
        [ contests, total ] = await getContests(req, false);
    }
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
    res.json(contest);
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
    let contestant, total;
    if (req.get('With-Scores') === 'yes') {
        [contestant, total]  = await getContestants(req,true, Number(req.get('FromContest').trim().replace(/^'(.*)'$/, '$1')));
    } else if(req.get('To-Form') === 'yes') {
        [ contestant, total ] = await getContestantsForForm();
    } else {
        [ contestant, total ] = await getContestants(req,false);
    }
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

app.delete("/contestant/:id", async (req, res) => {
    let { id }  = req.params;
    let { contestId } = req.body
    await deleteContestantFromContest(id, contestId);
    res.json({}).status(200)
});
app.post("/contestant", async (req, res) => {
    let contest  = await postContestantsForForm(req.body);
    res.json(contest).status(200);
});
app.put("/contestant/:id", async (req, res) => {
    let { id }  = req.params;
    let [contest]  = await editContestantsForForm(id, req.body);
    res.json(contest).status(200);
});


app.get('*', async (req, res) => {
    res.json({});
});
app.listen( 3000, () => {
    console.log("http://localhost:3000");
});
