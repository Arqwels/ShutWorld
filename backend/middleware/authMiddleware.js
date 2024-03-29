const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  if(req.method === "OPTIONS") {
    next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1];
    if(!token) {
      return res.status(402).json({message: "Пользователь не авторизован"});
    }
    const decodeData = jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY);
    req.user = decodeData;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({message: "Пользователь не авторизован"});
  }
}