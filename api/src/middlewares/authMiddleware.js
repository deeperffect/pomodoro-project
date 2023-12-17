const jwt = require('../lib/jwt');
const { SECRET } = require('../config');

exports.auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token) {
    try {
      const decodedToken = await jwt.verify(token, SECRET);
      req.user = decodedToken;
      next();
    } catch (error) {
      return res.status(401).json('wrong credentials');
    }
  }
}

exports.isAuth = async (req, res, next) => {
  try{
    const token = req.headers.authorization?.split(' ')[1];
    const decodedToken = await jwt.verify(token, SECRET);
    const userId = decodedToken._id;
    req.userId = userId;
    req.isAuth = true;
  } catch(err) {
    return res.status(401).json('wrong credentials');
  }
  next();
}

