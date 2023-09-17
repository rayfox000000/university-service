var express = require('express');
var router = express.Router();
var sequelize = require('../models/database');
var jwt = require('jsonwebtoken');
var config = require('../config/config.json')



router.get('/health', async function (req, res) {
    let status = 200
    let message = {
        service: 'ok'
    }
    try {
        await sequelize.authenticate();
        message.db = 'ok';
    } catch (error) {
        status = 400
        message.db = 'Unable to connect DB'
    }
    return res.status(status).send(message)
})

//Temporary API for this code challenge
router.post('/token', async function (req, res) {
    let jwtSecret = config.jwtSecret;
    // Generate a JWT token
    const {
        username,
        password
    } = req.body;

    // Replace with your authentication logic
    if (username === 'username' && password === 'password') {
        const token = jwt.sign({
            username
        }, jwtSecret, {
            expiresIn: '5h'
        });
        return res.json({
            token
        });
    } else {
        return res.status(401).json({
            message: 'Authentication failed'
        });
    }

})


module.exports = router