const router = require("express").Router();
const controller = require("../controllers/userRole.controller");

router.get("/", controller.getAll);
router.get("/:user_id/:role_id", controller.getById);
router.post("/", controller.create);
router.put("/:user_id/:role_id", controller.update);
router.delete("/:user_id/:role_id", controller.remove);

module.exports = router;