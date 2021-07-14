const hostname = '127.0.0.1';
const port = 3000;

const express = require("express");
var cors = require('cors');
var app = express();

app.use(cors());
const db = require('./queries')

app.use(express.json());

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});

app.post('/post', db.postPost);

app.get('/get', db.getPost);

