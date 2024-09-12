const jwt = require('jsonwebtoken');
const SECRET = 'SECR3t'; //This should be an env variable in real time application

const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, SECRET, (err, user) => {
            if(err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        })
    } else {
        res.status(401).json({ msg: 'Invalid auth token', auth: authHeader })
    }
};

module.exports = {
    authenticateJwt,
    SECRET
}