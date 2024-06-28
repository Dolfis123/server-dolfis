const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");

router.post("/login", loginController.loginPilih);
router.post("/regis", loginController.register);

module.exports = router;
