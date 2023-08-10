const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const courseRouter = require("./routes/courseRouter");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 5000;
// set body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//set route

//course
app.use("/api/course", courseRouter);

// buat server nya
app.listen(PORT, () => console.log(`Server running at port: ${PORT}`));
