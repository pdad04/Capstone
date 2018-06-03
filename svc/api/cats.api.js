const express = require('express');
const app = express();
const baseUrl = "/api/cats";

app.get(baseUrl, (req, res) =>{
    res.send([{name: "Peter", color: "Orange"}, {name: "Nemo", color: "White"}]);
});

app.get(`${baseUrl}/:name`, (req, res) => {
    res.send({name: req.params.name, color: "Orange"});
});

app.post(baseUrl, (req, res) => {
    const cat = req.body;
    cat.id = 1;
    res.send(cat);
});

module.exports = app;