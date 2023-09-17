var asyncMiddleware = require('middleware-async').asyncMiddleware
var config = require('../config/config.json');

module.exports = asyncMiddleware(async function (req, res, next) {

    //This is hardcode security matrix.... Best is to move out and create a client security
    const authPathsRegex = [
        /^\/api\/university\/.*/,
        /^\/api\/university/
    ];
    if (authPathsRegex.some(regex => regex.test(req.path)) && req.method == 'GET') {
        return next()
    }

    let isBasicAuth = ((req.headers.authorization || '').split(' ')[0] || '') === 'Basic'
    let isBearer = ((req.headers.authorization || '').split(' ')[0] || '') === 'Bearer'

    if (isBasicAuth) {
        let base64String = (req.headers.authorization || '').split(' ')[1] || ''
        let [clientId, clientSecret] = Buffer.from(base64String, 'base64').toString().split(':')

        if (clientId && clientSecret) {
            try {
                isAuthenticate = clientId == config.defaultClientId && clientSecret == config.defaultClientSecret ? true : false;
                if (!isAuthenticate)
                    throw new Error();
                return next()
            } catch (e) {
                return res.status(401).send({
                    error: 'Invalid Client'
                })
            }
        }
    }

    return res.status(403).send({
        error: 'Authentication required'
    })
})