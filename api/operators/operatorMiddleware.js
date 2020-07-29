const e = require("express");
const jwt = require('jsonwebtoken');

function operatorCheck(req, res, next){
    const token = req.headers.authorization;
    const secret = process.env.JWT_SECRET || 'is it secret? is it safe?';
  
    if(token){
      jwt.verify(token, secret, (error, decodedToken) => {
        if(error){
          res.status(401).json({ token: 'expired', message: error }); // invalid
        }else { 
          if(decodedToken.is_operator) {
              next();
          } else {
            res.status(401).json({ error: true, message: 'not operator'});
          } 
        }
      })
    }else{
      res.status(401).json({ message: 'please provide credentials!' });
    }
}

module.exports = {
    operatorCheck
}