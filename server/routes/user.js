const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.home);
router.get("/add", userController.addUser);
router.post("/add", userController.postUser);
router.get("/view/:id", userController.viewUser);
router.get("/edit/:id", userController.editUser);
router.put("/edit/:id", userController.edit);
router.delete("/edit/:id", userController.delete);

module.exports = router;
