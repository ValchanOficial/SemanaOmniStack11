const { validationResult } = require('express-validator');
const db = require('../database/connection');
const ONG_TABLE = 'ongs';

class SessionController {
    static createSession = async (req, res) => {
        const errors = await validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        const { id } = req.body;
        const ong = await db(ONG_TABLE)
            .where({id: id})
            .select('name')
            .first();
        if(!ong) {
            return res.status(400).json({ error: `No ONG found with this ID: ${id}`})
        }
        return res.json(ong);
    }
}

module.exports = SessionController;