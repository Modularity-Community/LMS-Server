const {
  insertCourse,
  getAllCourse,
  updateCourse,
  deleteCourse,
} = require("../models/course");

exports.createData = (req, res) => {
  const data = { ...req.body };
  const querySql = 'INSERT INTO course set ?'

  insertCourse(res,querySql,data)
};

exports.readData = (req,res)=>{
  const querySql = 'SELECT * FROM course'

  getAllCourse(res,querySql)
}

