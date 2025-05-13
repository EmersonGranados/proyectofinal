const router = require("express").Router();
const multer = require('multer');
const storge = require("../middlewares/user-avatar.multer");

const controller = require("../controllers/user.controller");
const uploader = multer ({storage});

router.get("/", controller.getAll);
router.get("/:id", controller.getOne);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.deleted);
router.post('/images/avatar/:id', [uploader.single("avatar")],controller.uploadAvatar);

module.exports = router;