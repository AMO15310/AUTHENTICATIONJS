const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  try {
    let token = req.headers["token"];
    !token ? res.json({ message: "Please login to access this route" }) : "";

    jwt.verify(token, process.env.JWT_SIGNATURE);

    next();
  } catch (error) {
    res.json(error);
  }
};

module.exports = verifyToken;
