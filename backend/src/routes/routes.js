const { Router } = require('express');
const routes = Router();

const Health = require('../controllers/testController');

routes.get('/test', Health.test);

module.exports = routes;