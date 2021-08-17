const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
    if(req.method === 'OPTIONS'){
        return next()
    }
    try{
        const token = req.headers.authorization.split(' ')[1]
        if(!token){
            return res.status(401).json({message: 'Auth error'})
        }
        jwt.verify(token, config.get('jwtSecret'), (error, user) => {
            if(error) {
                res.status(401).json('Invalid token!')
            } else {
                req.user = user
                next()
            }
        })
    } catch(error){
        return res.status(401).json({message: 'No authorization token'})
    }
}