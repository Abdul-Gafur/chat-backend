const { Router } = require("express");
const UserController = require("../controllers/UserController");

const router = Router();

router
  .route("/")
  .get((req, res) => res.send("user"))
  .post(UserController.register);

module.exports = router;
