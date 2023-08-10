const courseContoller = require("../controllers/courseController");
const express = require("express");
const router = express.Router();

router.get("/", courseContoller.getListCourse);
router.get("/:courseId", courseContoller.getListCourseById);
router.post("/", courseContoller.insertCourse);

module.exports = router;
