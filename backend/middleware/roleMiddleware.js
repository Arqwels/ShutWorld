const jwt = require('jsonwebtoken');

module.exports = function (roles) {
  return function (req, res, next) {
    if(req.method === "OPTIONS") {
      next();
    }
  
    try {
      if(!req.headers.authorization) {
        return res.status(403).json({message: "Пользователь не авторизован"});
      }
      const token = req.headers.authorization.split(' ')[1];
      if(!token) {
        return res.status(403).json({message: "Пользователь не авторизован"});
      }
      const {roles: userRoles} = jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY);
      let hasRole = false;
      userRoles.forEach(role => {
        if (roles.includes(role)) {
          hasRole = true;
        }
      });
      if (!hasRole) {
        return res.status(403).json({message: "У вас недостаточно прав!"});
      }
      next();
    } catch (error) {
      console.log(error);
      return res.status(403).json({message: "Пользователь не авторизован"});
    }
  }
};