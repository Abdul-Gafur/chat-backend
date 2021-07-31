const { Router } = require("express");
const { create, getChat, update } = require("../controllers/ChatController");

const router = Router();

router.route("/").post(create).get(getChat).patch(update);

module.exports = router;
