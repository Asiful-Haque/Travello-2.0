const express = require("express");
const { addReview } = require("../controller/reviewController");

const router = express.Router();

router.post("/api/setReview", addReview);

module.exports = router;
