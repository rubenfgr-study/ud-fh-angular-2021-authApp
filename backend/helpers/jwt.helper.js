const jwt = require("jsonwebtoken");

const generateJWT = (uid, name) => {
  const payload = { uid, name };
  const secret = process.env.JWT_SECRET;
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, { expiresIn: "24h" }, (err, token) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
};

module.exports = { generateJWT };
