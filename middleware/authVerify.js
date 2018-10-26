const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try{
    const key = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(key, process.env.JWT_KEY);
    req.userData = decoded;
    next();
  } catch (error){
    return res.status(401).json({
      message: 'Auth failed'
    });
  }
};
