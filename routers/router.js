var express = require('express');
var router = express.Router();
var universityRouter = require('./universityRouter');
var generalRouter = require('./generalRouter');
var OpenApiValidator = require('express-openapi-validator');
var path = require('path')

router.use((req, res, next) => {
    console.log('Called: ', req.method, req.path);
    next();
})
router.use(generalRouter);

router.use(OpenApiValidator.middleware({
    apiSpec: path.resolve(__dirname, './../swagger/openapi.yaml'),
    validateRequests: true, // (default)
}))
router.use(universityRouter)

router.use('*', (req, res) => {
    return res.status(404).send({
        message: 'Cannot ' + req.method + ' ' + req.originalUrl
    })
})


module.exports = router