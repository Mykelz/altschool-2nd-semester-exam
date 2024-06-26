const jwt = require('jsonwebtoken');
require('dotenv').config();


module.exports = async (req, res, next)=>{
    const authHeader = req.get('Authorization');
    if(!authHeader){
        const error = new Error('Unauthorized')
        error.statusCode = 401;
        throw error;
    }
    const token = authHeader.split(' ')[1]
    let decodedToken;

    try{
        decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    }catch(err){
        err.statusCode = 500;
        throw err
    }
    if (!decodedToken){
        const error = new Error('Unauthorized');
        error.statusCode = 401;
        throw error
    }
    req.user = decodedToken.userId
    next()
}