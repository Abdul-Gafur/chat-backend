const { Router } = require("express");
const { create, remove } = require("../controllers/UserController");

const router = Router();

router
  .route("/")
  .get((req, res) => res.send("user"))
  .post(create)
  .delete(remove);

module.exports = router;
