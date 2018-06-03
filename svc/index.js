const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(require('./api/movies.api'));

app.listen(3000, () => console.log("App now running on port 3000"));