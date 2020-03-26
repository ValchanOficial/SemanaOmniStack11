const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('../routes/routes');

// app.use(cors({ origin: 'http://localhost:3000'}));
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});
app.use(routes)

module.exports = app;