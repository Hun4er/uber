const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const blacklistToken = require('../models/blacklistToken.model');

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if(!token){
        return res.status(401).json({message: "Unauthorized Access"});
    }
    
    const isBlacklisted = await blacklistToken.findOne({token: token});
    if(isBlacklisted){
        return res.status(401).json({message: "Unauthorized Access"});
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        req.user = user;
        
        return next();





    }catch(err){
        return res.status(401).json({message: "Unauthorized Access"});
    }
}