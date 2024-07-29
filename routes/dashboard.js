const express = require("express");
const { getReview } = require("../controller/dashboardController");

const router = express.Router();

router.get("/api/getReviews", getReview);

module.exports = router;
