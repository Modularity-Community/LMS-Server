const express = require("express");
const bodyParser = require("body-parser");
const conn = require("./connection");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 5000;
// set body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// buat server nya
app.listen(PORT, () => console.log(`Server running at port: ${PORT}`));
