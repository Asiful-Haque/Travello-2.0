const bcrypt = require("bcrypt");
const userSchemaModel = require("../models/userSchema.js");

exports.checkUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const users = await userSchemaModel.find();

        const user = users.find((user) => user.email === email);

        if (!user) {
            return res.status(404).send("Not registered");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // If email and password match, user is authenticated
        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        console.error(`Error logging in: `, error.message);
        res.status(500).send(`Internal server error`);
    }
};
