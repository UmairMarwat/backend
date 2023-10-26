const express = require("express");
const router = express.Router();
const Usercontroller = require("../controllers/user");

router.post("/signup", Usercontroller.signupPost);
router.get("/signup-get", Usercontroller.signupGet);
router.get("/signup-getid/:id", Usercontroller.signupGetById);
router.post("/login", Usercontroller.loginpost);

module.exports = router;
