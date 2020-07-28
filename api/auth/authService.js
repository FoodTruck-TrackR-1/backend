module.exports = {
    isName,
    isUsername,
    isPassword,
    isOperator,
  };
  
  // function isValid(req, res, next) {
  //   isName(req, res, next);
  //   isUsername(req, res, next);
  //   isPassword(req, res, next);
  //   isOperator(req, res, next);
  //   next();
  // }

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
  function isUsername(req, res, next) {
    const user = req.body;
    
    if(user.username){
      next();
    } else {
      res.status(400).json({
        message: "please provide username",
      });
    }
  }
  function isPassword(req, res, next) {
    const user = req.body;
    
    if(user.password){
      next();
    } else {
      res.status(400).json({
        message: "please provide password",
      });
    }
  }
  function isOperator(req, res, next) {
    const user = req.body;
    
    if(user.is_operator){
      next();
    } else {
      res.status(400).json({
        message: "please provide if user is operator or diner",
      });
    }
  }