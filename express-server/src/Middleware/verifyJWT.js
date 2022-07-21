var jwt = require('jsonwebtoken');
require('dotenv').config();
var verifyJWT = function (req, res, next) {
    // const authHeader = req.headers['authorization'];
    var authHeader = req.headers.authorization || req.headers.Authorization;
    if (!(authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith('Bearer ')))
        return res.sendStatus(401);
    //if (!authHeader) return res.sendStatus(401);
    console.log("verifyJWT.ts bearer token " + authHeader); // Bearer token
    var token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
        if (err)
            return res.sendStatus(403); //invalid token
        req.user = decoded.email;
        next();
    });
};
module.exports = verifyJWT;
