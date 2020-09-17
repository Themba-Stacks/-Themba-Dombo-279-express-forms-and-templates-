const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { addNewVisitor, getVisitor } = require("./public/scripts/saveData")
const port = 3002;


mongoose.connect('mongodb://localhost/app', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error',(error) => console.error(error));
db.once('open', () => console.log('connected to database'))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set(express.static(path.join(__dirname, "public")))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/new_visit', (req, res) => {
    res.render('form');
    res.end();
});

app.post('/save',addNewVisitor, getVisitor, (req, res) => {
    const data = res.visitor
    const id = data._id;
    const date = data.dateOfVisit;
    const name = data.name;
    const assisted = data.assistedBy;
    const age = data.age;
    const time = data.timeOfVisit;
    const comment = data.comments;
    res.render('thank',{id, name, age, time, date, assisted, comment})

    console.log("saved!")
    res.end();
});

var server = app.listen(port, () => console.log(`server started on ${port}`));

module.exports = server;