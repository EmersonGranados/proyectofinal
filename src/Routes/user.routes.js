const router = require("express").Router();
const controller = require("../controllers/user.controller");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images/users/avatar/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const uploader = multer({ storage });

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

router.post(
    "/images/avatar/:id",
    uploader.single("avatar"),
    controller.uploadAvatar
);

module.exports = router;