const { validationResult } = require('express-validator');
const crypto = require('crypto');
const db = require('../database/connection');
const ONG_TABLE = 'ongs';

class OngController {

    static getOng = async (req, res) => {
        const ongs = await db(ONG_TABLE).select('*');
        // if(ongs.length === 0){
        //     return res.status(404).json({ error: 'ONGs not found!'});
        // }
        return res.status(200).json(ongs);
    }

    static createOng = async (req, res) => {
        const errors = await validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        const { name, email, whatsapp, city, uf } = req.body;
        const id = crypto.randomBytes(4).toString('HEX');
        await db(ONG_TABLE)
            .insert({id, name, email, whatsapp, city, uf});
        return res.status(201).json({ message: 'ONG created!', id: id });
    }

    static updateOng = async (req, res) => {
        const errors = await validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        const { name, email, whatsapp, city, uf } = req.body;
        const response = await db(ONG_TABLE)
            .where({id: req.params.id})
            .update({name, email, whatsapp, city, uf});
        if(response === 0){
            return res.status(404).json({ error: 'ONG not found!'});
        }
        return res.status(202).json({ message: 'ONG updated successfully!'});
    }

    static deleteOng = async (req, res) => {
        const response = await db(ONG_TABLE)
            .where({id: req.params.id})
            .del();
        if(response === 0){
            return res.status(404).json({ error: 'ONG not found!'});
        }
        return res.status(202).json({ message: 'ONG deleted successfully!'});
    }
    
}

module.exports = OngController;