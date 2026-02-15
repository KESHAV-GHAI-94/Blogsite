const jwt = require("jsonwebtoken");
const optionalAuth = (req, res, next) => {
  try {
    const token = req.cookies.authToken;
    if (!token) {
      req.user = null;
      return next();
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    req.user = null;
    next();
  }
};
module.exports = optionalAuth;
