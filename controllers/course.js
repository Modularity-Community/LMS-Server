const {
  insertCourse,
  getAllCourse,
  updateCourse,
  deleteCourse,
} = require("../models/course");

exports.createData = (req, res) => {
  const data = { ...req.body };
  const querySql = "INSERT INTO course set ?";

  insertCourse(res, querySql, data);
};

exports.readData = (req, res) => {
  const querySql = "SELECT * FROM course";

  getAllCourse(res, querySql);
};

exports.updateData = (req, res) => {
  const data = { ...req.body };
  const querySearch = "SELECT * FROM course where id";
  const queryUpdate = "UPDATE course SET? WHERE id = ?";

  updateCourse(res, querySearch, queryUpdate, req.params.id, data);
};

exports.deleteData = (req, res) => {
  const data = { ...req.body };
  const querySearch = "SELECT * FROM course where id";
  const queryDelete = "DELETE FROM course WHERE id = ?";

  deleteCourse(res, querySearch, queryDelete, req.params.id);
};
