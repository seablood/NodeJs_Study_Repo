const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Person = require("./person-model");

mongoose.set("strictQuery", false);

const app = express();
app.use(bodyParser.json()); // 해당 미들웨어를 추가해야만 HTTP에서 Body 파싱 가능
app.listen(3000, async () => {
    console.log("Server Start!!");
    const uri = "mongodb+srv://dudwnszero99:nodejs@cluster1.k5bjxhc.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster1";

    mongoose.connect(uri)
            .then(console.log("Connected to MongoDB"));
});

app.get("/person", async (_, res) => {
    const person = await Person.find({});
    res.send(person);
});

app.get("/person/:email", async (req, res) => {
    const person = await Person.findOne({email: req.params.email});
    res.send(person);
});

app.post("/person", async (req, res) => {
    const person = new Person(req.body);
    await person.save();
    res.send(person);
});

app.put("/person/:email", async (req, res) => {
    const person = await Person.findOneAndUpdate(
        {email: req.params.email}, 
        {$set: req.body}, 
        {new: true}
    );
    res.send(person);
});

app.delete("/person/:email", async (req, res) => {
    await Person.deleteMany({email: req.params.email});
    res.send({success: true});
});