const express = require('express');
const request = require('request');
const app = express();
const Movie = require('../models/movie');
const baseUrl = "/api/movies";


app.get(`${baseUrl}/:name`, (req, res) => {
    request(`https://itunes.apple.com/search?term=${req.params.name}&media=movie&entity=movie&attribute=movieTerm`, (err, resp, body) => {
        const returnData = JSON.parse(body);
        let movies = [];


        for(var i in returnData.results){
            if(returnData.results[i].hasOwnProperty('trackRentalPrice') || returnData.results[i].hasOwnProperty('trackHdRentalPrice')){
                movies.push(new Movie(returnData.results[i].trackName, 
                                      returnData.results[i].releaseDate, 
                                      returnData.results[i].trackId,
                                      returnData.results[i].longDescription,
                                      returnData.results[i].artworkUrl100,
                                      returnData.results[i].trackRentalPrice)
                            );
        
            }else{
                movies.push(new Movie(returnData.results[i].trackName, 
                                      returnData.results[i].releaseDate, 
                                      returnData.results[i].trackId,
                                      returnData.results[i].longDescription,
                                      returnData.results[i].artworkUrl100)
                            );
            }
        }
        
        res.send(movies);
        
    });
    
});


module.exports = app;