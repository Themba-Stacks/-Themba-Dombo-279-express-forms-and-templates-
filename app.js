const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 3002;
const newVisitor = require('./models/newVisitor');

mongoose.connect('mongodb://localhost/app', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error',(error) => console.error(error)).catch(()=>console.log('promise rejected'));
db.once('open', () => console.log('connected to database'))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set(express.static(path.join(__dirname, "public")))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/new_visit', (req, res) => {
    res.render('form');
    res.end()
});

app.post('/save', (req, res) => {
    const data = req.body
    console.log(data)
    const visitor = new newVisitor(data);
    visitor.save((error) => {if(error){res.status(500).json({message: "internal server error"})}})
    console.log("saved!")
    res.render('thank')
    res.end();
    });

app.listen(port, () => console.log(`server started on ${port}`));