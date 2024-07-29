const reviewSchemaModel = require("../models/reviewSchema.js");

exports.getReview = async (req, res) => {
    try {
        const reviews = await reviewSchemaModel.find();
        res.status(200).json(reviews);
    } catch (error) {
        console.error("Error saving information: ", error.message);
        res.status(500).send("Internal server error");
    }
};
