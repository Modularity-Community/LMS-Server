const {
  insertCourse,
  getAllCourse,
  updateCourse,
  deleteCourse,
} = require("../models/course");

exports.createData = (req, res) => {
  const data = { ...req.body };
  const querySql = 'INSERT INTO corse set ?'

  insertCourse(res,querySql,data)
};
