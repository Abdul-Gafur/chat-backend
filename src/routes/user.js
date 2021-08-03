const { Router } = require("express");
const { create, remove, login } = require("../controllers/UserController");

const router = Router();

router
  .route("/")
  .get((req, res) => res.send("user"))
  .post(create)
  .delete(remove);
router.route("/login").post(login);

module.exports = router;
