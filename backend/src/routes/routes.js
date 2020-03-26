const { Router } = require('express');
const routes = Router();
const validator = require('../utils/validator');

const HealthController = require('../controllers/testController');
const SessionController = require('../controllers/sessionController');
const OngController = require('../controllers/ongController');
const IncidentController = require('../controllers/incidentController');
const ProfileController = require('../controllers/profileController');

routes.get('/test', HealthController.test);

routes.post('/session',  validator.ongBodyIdCheck, SessionController.createSession);

routes.get('/ongs', OngController.getOng);
routes.post('/ongs', validator.ongBodyCheck, OngController.createOng);
routes.put('/ongs/:id', validator.ongBodyCheck, OngController.updateOng);
routes.delete('/ongs/:id', OngController.deleteOng);

routes.get('/incidents', IncidentController.getIncident);
routes.post('/incidents', validator.incidentBodyCheck, IncidentController.createIncident);
routes.put('/incidents/:id', validator.incidentBodyCheck, IncidentController.updateIncident);
routes.delete('/incidents/:id', IncidentController.deleteIncident);

routes.get('/profile', ProfileController.getIncident);

module.exports = routes;