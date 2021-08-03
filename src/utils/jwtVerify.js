const jwt = require("jsonwebtoken");

const jwtVerify = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        reject(err);
      }
      resolve(decoded);
    });
  });

module.exports = { jwtVerify };
