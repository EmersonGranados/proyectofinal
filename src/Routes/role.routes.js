const router = require ("express").Router();

const controller = require ("../controllers/rol.controller");

router.get("/", controller.getAll);
router.get("/:id", controller.getOne);
router.post("/", controller.created);
router.put("/:id", controller.updated);
router.delete("/", controller.deleted);

module.exports = router;