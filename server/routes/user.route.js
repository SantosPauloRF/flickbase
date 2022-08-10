const express = require("express");
const userController = require("../controllers/user.controller")
const router = express.Router();

{/* MIDDLEWARES */ }

const auth = require("../middlewares/auth")

router.route("/profile")
.get(auth("readOwn", "profile"), userController.profile)


module.exports = router