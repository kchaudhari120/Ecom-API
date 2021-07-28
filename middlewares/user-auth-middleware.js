const jwt = require('jsonwebtoken')
const JWT_KEY = "123456"

function userAuthMiddleware(req, res, next) {
    try {
        const bearenToken = req.headers.authorization;
        let token = null;
        token = bearenToken.split(" ")[1];
        const payload = jwt.verify(token, JWT_KEY);
        req.session = {
            user: payload
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(401)
        return res.json({error : "invalid token"})
    }
}

function adminAuthMiddleware(req, res, next) {
    try {
        const bearenToken = req.headers.authorization;
        let token = null;
        token = bearenToken.split(" ")[1];
        const payload = jwt.verify(token, JWT_KEY );
        req.session = {
            user: payload
        }
        if(payload.isAdmin){
            return next();
        }
        res.status(401)
        return res.json({error : "you are not authorized to access resource"})

    } catch (error) {
        console.log(error);
        res.status(401)
        return res.json({error : "invalid token"})
    }
}

module.exports = {userAuthMiddleware, adminAuthMiddleware}