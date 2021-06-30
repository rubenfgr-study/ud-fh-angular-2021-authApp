const { response } = require("express");
const jwt = require('jsonwebtoken');

const validateJWT = (req, res = response, next) => {
  const { authorization } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "Token required",
    });
  }

  try {
    const secret = process.env.JWT_SECRET;
    const { uid, name } = jwt.verify(token, secret);
    req.uid = uid;
    req.name = name;
    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Invalid token",
    });
  }
};

module.exports = validateJWT;
