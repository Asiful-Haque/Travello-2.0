const reviewSchemaModel = require("../models/reviewSchema.js");

exports.getSearchReviewByList = async (req, res) => {
    try {
        const { word } = req.params;

        const regex = new RegExp(word, "i"); 
        const reviews = await reviewSchemaModel.find({
            $or: [{ title: { $regex: regex } }, { review: { $regex: regex } }],
        });

        if (!reviews || reviews.length === 0) {
            return res.status(404).json({ message: "No reviews found" });
        }

        res.json(reviews);
    } catch (error) {
        console.error("Error fetching reviews: ", error.message);
        res.status(500).send("Internal server error");
    }
};
