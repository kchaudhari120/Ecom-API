const jwt = require('jsonwebtoken')

function userAuthMiddleware(req, res, next) {
    try {
        const bearenToken = req.headers.authorization;
        let token = null;
        token = bearenToken.split(" ")[1];
        const payload = jwt.verify(token, "123456");
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

module.exports = {userAuthMiddleware}