const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authenticate = async (req, res, next) => {
  //  console.log('headers',req.headers.authorization)

  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw { status: 401, message: "authentication required!" };
    }
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodeToken.userId);
    if (!user) throw { status: 401, message: "unauthorized user!" };
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;
