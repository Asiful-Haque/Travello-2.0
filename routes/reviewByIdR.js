const express = require("express");
const { getReviewById } = require("../controller/reviewByIdController");

const router = express.Router();

router.get("/reviewById/:id", getReviewById);

module.exports = router;
