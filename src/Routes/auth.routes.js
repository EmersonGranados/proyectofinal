const express = require("express");
const controller = require("../controllers/auth.controller");
const router = express.Router();

router.post("/login", controller.login);
router.post("/", controller.create);

module.exports = router;