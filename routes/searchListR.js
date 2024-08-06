const express = require("express");
const { getSearchReviewByList } = require("../controller/searchListController.js");

const router = express.Router();

router.get("/reviewByWord/:word", getSearchReviewByList);

module.exports = router;
