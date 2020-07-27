module.exports = {
    isValid,
  };
  
  function isValid(req, res, next) {
    isName(req, res, next);
    const user = req.body;
    if(user.name && user.username && user.password && user.userType && typeof user.password === "string"){
      next();
    } else {
      res.status(400).json({
        message: "please provide username, password, and user type",
      });
    }
  }

  function isName(req, res, next) {
    const user = req.body;
    console.log(user)
    if(user.name){
      next();
    } else {
      res.status(400).json({
        message: "please provide name",
      });
    }
  }