const courseContoller = require('../controllers/courseController')
const express = require("express");
const router = express.Router();

router.get("/", courseContoller.getListCourse);


module.exports = router;
