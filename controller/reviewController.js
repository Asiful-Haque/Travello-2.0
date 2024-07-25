const reviewSchemaModel = require("../models/reviewSchema.js");

exports.addReview = async (req, res) => {
    try {
        const { title, review } = req.body;

        // Create a new review instance
        const newReview = new reviewSchemaModel({
            title,
            review,
        });

        // Save the user to the database
        const savedReview = await newReview.save();

        res.status(201).json(savedReview);
    } catch (error) {
        console.error("Error saving information: ", error.message);
        res.status(500).send("Internal server error");
    }
};
