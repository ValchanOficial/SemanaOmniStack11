const express = require('express');
const cors = require('cors');
const app = express();
const Database = require('./database');
const routes = require('../routes/routes');

Database.connect();

// app.use(cors({ origin: 'http://localhost:3000'}));
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});
app.use(routes)

module.exports = app;