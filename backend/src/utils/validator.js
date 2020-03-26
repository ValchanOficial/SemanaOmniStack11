const { check } = require('express-validator');

exports.ongBodyCheck = [
        check('name').notEmpty().isString(),
        check('email').notEmpty().isEmail().withMessage('Email is invalid'),
        check('whatsapp').notEmpty(),
        check('city').notEmpty().isString().withMessage('City is empty'),
        check('uf').notEmpty().isLength({ max: 2 })
    ]

exports.incidentBodyCheck = [
    check('title').notEmpty().isString(),
    check('description').notEmpty().isString(),
    check('value').notEmpty().isDecimal()
]

exports.ongBodyIdCheck = [
    check('id').notEmpty().isString()
]