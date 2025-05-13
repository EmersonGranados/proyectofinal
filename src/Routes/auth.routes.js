const router = require ("express").Router();

const controller = require("../Controllers/auth.controller");

router.get("/login", controller.login);
router.post("/", controller.create);

module.exports = router;