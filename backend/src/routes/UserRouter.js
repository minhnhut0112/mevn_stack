const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");

router.post("/sign-up", userController.createUser);
router.post("/sign-in", userController.loginUser);
router.put("/update-user/:id", userController.updateUser);
router.delete("/delete-user/:id", userController.deleteUser);
router.get("/get-details/:id", userController.getdetailsUser);
router.get("/getAll", userController.getAllUser);

module.exports = router;
