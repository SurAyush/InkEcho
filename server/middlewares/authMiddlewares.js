const jwt = require('jsonwebtoken');
const HttpError = require('../models/errorModel.js');

const authMidlleware = async (req, res, next) => {
    const AuthorizeUser = req.headers.authorization || req.headers.Authorization;
    if(AuthorizeUser && AuthorizeUser.startsWith('Bearer')){
        const token = AuthorizeUser.split(' ')[1];
        jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
            if(err){
                return next(new HttpError("Authentication failed: Invalid token",403));
            }
            req.user = decoded;     //user_id and username (whatever is signed)
        });
        next();
    }
    else{
        return next(new HttpError("No token: No logged in user found",402));
    }
}

module.exports = authMidlleware;

//req.header.autherization = "Bearer <jwt-token>";   for a logged-in user