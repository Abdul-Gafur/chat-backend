const { jwtVerify } = require("../utils");

const checkAuth = async (req, res, next) => {
  try {
    if (req.path === "/user/login" || req.path === "/user/register") return next();

    const token = req.headers.authorization || "";
    const { data } = await jwtVerify(token);
    req.user = req.data;
    next();
  } catch (err) {
    res.status(401).json(err);
  }
};

module.exports = checkAuth;
