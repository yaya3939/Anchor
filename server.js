require("dotenv").config();
const express = require("express");
const connectDB = require("./middleware/db");

const app = express();

//mongoose connect
connectDB();

//init middleware
//same func as body-parser
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("Anchor Running"));

//Define Routes
app.use("/api/user", require("./routes/api/user"));
app.use("/api/anchors", require("./routes/api/anchors"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
