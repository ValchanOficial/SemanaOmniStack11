const { validationResult } = require('express-validator');
const db = require('../database/connection');
const INCIDENT_TABLE = 'incidents';
const ONG_TABLE = 'ongs';

class IncidentController {

    static getIncident = async (req, res) => {
        const { page = 1 } = req.query;

        const [count] = await db(INCIDENT_TABLE).count();

        const incidents = await db(INCIDENT_TABLE)
            .join(ONG_TABLE, 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf']);
        // if(incidents.length === 0){
        //     return res.status(404).json({ error: 'Incidents not found!'});
        // }
        res.header('X-Total-Count', count['count(*)']);
        return res.status(200).json(incidents);
    }

    static createIncident = async (req, res) => {
        const errors = await validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        const { title, description, value } = req.body;
        const ong_id = req.headers.authorization;
        const [id] = await db(INCIDENT_TABLE)
            .insert({title, description, value, ong_id});
        return res.status(201).json({ message: 'Incident created!', id: id });
    }

    static updateIncident = async (req, res) => {
        const errors = await validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        
        const incident = await db(INCIDENT_TABLE)
            .where({id: req.params.id})
            .select('ong_id')
            .first();
        if(incident === undefined){
            return res.status(404).json({ error: 'Incident not found!'});
        }
        if(incident.ong_id !== req.headers.authorization){
            return res.status(401).json({ error: 'Operation not permitted!' });
        }

        const { title, description, value } = req.body;
        await db(INCIDENT_TABLE)
            .where({id: req.params.id, ong_id: req.headers.authorization})
            .update({ title, description, value });
        return res.status(202).json({ message: 'Incident updated successfully!'});
    }

    static deleteIncident = async (req, res) => {
        const incident = await db(INCIDENT_TABLE)
            .where({id: req.params.id})
            .select('ong_id')
            .first();
        if(incident === undefined){
            return res.status(404).json({ error: 'Incident not found!'});
        }
        if(incident.ong_id !== req.headers.authorization){
            return res.status(401).json({ error: 'Operation not permitted!' });
        }
        await db(INCIDENT_TABLE)
            .where({id: req.params.id, ong_id: req.headers.authorization})
            .del();
        return res.status(202).json({ message: 'Incident deleted successfully!'});
    }
    
}

module.exports = IncidentController;