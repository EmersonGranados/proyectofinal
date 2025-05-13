const router = require("express").Router();

const controller = require("../controllers/user.controller");


router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.created);
router.put("/:id", controller.updated);
router.delete("/:id", controller.deleted);
router.get('/avatar/:id', controller.getAvatar);

module.exports = router;