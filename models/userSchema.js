const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    address: String,
    password: String,   
});

const userSchemaModel = mongoose.model("travelRegister", userSchema);

module.exports = userSchemaModel;
