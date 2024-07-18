const bcrypt = require("bcrypt");
const userSchemaModel = require("../models/userSchema.js");

exports.addUser = async (req, res) => {
    try {
        const { name, email, address, password } = req.body;

        // Check if email is already taken
        const existingUser = await userSchemaModel.findOne({ email });
        if (existingUser) {
            return res.status(409).send("This mail has been taken");
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance
        const newUser = new userSchemaModel({
            name,
            email,
            address,
            password: hashedPassword,
        });

        // Save the user to the database
        const savedUser = await newUser.save();

        res.status(201).json(savedUser);
    } catch (error) {
        console.error("Error saving information: ", error.message);
        res.status(500).send("Internal server error");
    }
};
    