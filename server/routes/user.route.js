const express = require("express");
const userController = require("../controllers/user.controller")
const router = express.Router();

{/* MIDDLEWARES */ }

const auth = require("../middlewares/auth")

router.route("/profile")
.get(auth("readOwn", "profile"), userController.profile)
.patch(auth("updateOwn", "profile"), userController.updateProfile)

router.patch("/email", auth("updateOwn", "profile"), userController.updateUserEmail )

router.get("/verify", userController.verifyAccount)


module.exports = router