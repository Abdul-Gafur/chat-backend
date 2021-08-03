const { createToken } = require("./jwtToken");
const { jwtVerify } = require("./jwtVerify");

module.exports = { createToken, jwtVerify };
