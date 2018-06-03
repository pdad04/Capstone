const express = require('express');
const app = express();
const Movie = require('../models/movie');
const baseUrl = "/api/movies";

app.get(`${baseUrl}/:name`, (req, res) => {
    res.send(getTestData(req.params.name));
});

function getTestData(name){
    return [new Movie("Allen's Awesome Movie", new Date(), new Date()), new Movie("Andre's also awesome but slightly less awesome movie", new Date(), new Date()), , new Movie(name, new Date(), new Date())];
}

module.exports = app;