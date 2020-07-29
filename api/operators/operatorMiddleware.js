const e = require("express");
const jwt = require('jsonwebtoken');

function operatorCheck(req, res, next){
    if(req.decodedToken.is_operator){
      next();
    } else {
      res.status(400).json({ error: true, message: 'not operator'});
    }
}

module.exports = {
    operatorCheck
}