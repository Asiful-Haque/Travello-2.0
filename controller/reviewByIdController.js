const Review = require("../models/reviewSchema.js");

exports.getReviewById = async (req, res) => {
    try {
        const reviewId = req.params.id;
        const review = await Review.findById(reviewId);

        if (!review) {
            return res.status(404).send("Review not found");
        }

        res.json(review);
    } catch (error) {
        res.status(500).send("Server error");
    }
};
