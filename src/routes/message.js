const { Router } = require("express");
const { create, getMessage } = require("../controllers/MessageController");

const router = Router();

router.route("/").get(getMessage).post(create);

module.exports = router;
