const express = require("express");
const { checkUser } = require("../controller/loginController");

const router = express.Router();

router.post("/api/authentication", checkUser);

module.exports = router;
