const { validationResult } = require('express-validator');
const db = require('../database/connection');
const INCIDENT_TABLE = 'incidents';

class ProfileController {

    static getIncident = async (req, res) => {
        const incidents = await db(INCIDENT_TABLE)
            .where({ong_id: req.headers.authorization})
            .select('*');
        // if(incidents.length === 0){
        //     return res.status(404).json({ error: 'Incidents not found!'});
        // }
        return res.status(200).json(incidents);
    }
    
}

module.exports = ProfileController;