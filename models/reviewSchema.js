const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
    title: String,
    review: String
});

const reviewSchemaModel = mongoose.model("reviewTable", reviewSchema);

module.exports = reviewSchemaModel;
