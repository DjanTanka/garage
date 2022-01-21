const jwt = require("jsonwebtoken");
const User = require("../models/user");
const generateToken = require("../utils/secret");

module.exports = async (req, res, next) => {
  const authAccess = req.get("AuthorizationA");
  const authRefresh = req.get("AuthorizationR");
  try {
    const decodedTokenA = jwt.verify(authAccess, process.env.TOKEN_SECRET_KEY);
    const user = await User.findOne({ _id: decodedTokenA.userId });
    if (!user.isActivated) {
      req.isAuth = false;
      return next();
    }
    if (user) {
      req.isAuth = authAccess;
      req.thisUser = jwt.verify(authAccess, process.env.TOKEN_SECRET_KEY);
      next();
    }
  } catch (err) {
    try {
      const decodedTokenR = jwt.verify(
        authRefresh,
        process.env.TOKEN_SECRET_KEY
      );
      const user = await User.findOne({ email: decodedTokenR.email });
      if (!user) {
        req.isAuth = false;
        return next();
      }
      const newAuthAccess = await generateToken(
        user.id,
        user.role,
        null,
        "30m"
      );
      req.isAuth = newAuthAccess;
      req.thisUser = jwt.verify(newAuthAccess, process.env.TOKEN_SECRET_KEY);
      return next();
    } catch (err) {
      req.isAuth = false;
      return next();
    }
  }
};
