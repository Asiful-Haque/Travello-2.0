const express = require("express");
const registerRoutes = require("./routes/registration.js");
const loginRoutes = require("./routes/login.js");
const reviewRoutes = require("./routes/review.js");
const connectDB = require("./models/db.js");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = 8005;

//database
connectDB();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("view"));

//routes
app.use(registerRoutes);
app.use(loginRoutes);
app.use(reviewRoutes);

app.get("/", (req, res) => {
    res.send("Hello");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
