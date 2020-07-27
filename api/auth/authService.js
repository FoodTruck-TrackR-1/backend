module.exports = {
    isValid,
  };
  
  function isValid(user) {
    return Boolean(user.name && user.username && user.password && user.userType && typeof user.password === "string");
  }