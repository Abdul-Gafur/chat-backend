const jwt = require("jsonwebtoken");

const createToken = ({ username, _id }) => {
  return jwt.sign(
    {
      data: { username, _id },
    },
    process.env.JWT_KEY,
    {
      expiresIn: process.env.JWT_EXPIRATION_DELTA,
      algorithm: "HS256",
    }
  );
};

module.exports = { createToken };
