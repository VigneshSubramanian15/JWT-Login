const jwt = require('jsonwebtoken');

module.exports = function (req, res, next){
    const token = req.header('Authentication')
    if(!token){return res.status(401).send('Access Denied!')}

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SALT)
        req.user = verified
        next()
    }catch{
        res.status(401).send('token expired')
    }
}