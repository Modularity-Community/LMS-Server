const {
  insertCourse,
  getAllCourse,
  updateCourse,
  deleteCourse,
} = require("../models/courseModel");

exports.createData = (req, res) => {
  const data = { ...req.body };
  const querySql = "INSERT INTO course set ?";

  insertCourse(res, querySql, data);
};

exports.readAllData = (req, res) => {
  const querySql = "SELECT * FROM course";

  getAllCourse(res, querySql);
};

exports.readDataById = (req, res) => {
  const id = req.params.id;
  const querySql = `SELECT * FROM course WHERE id = ${id}`;

  getAllCourse(res, querySql);
};

exports.updateData = (req, res) => {
  const data = { ...req.body };
  const querySearch = "SELECT * FROM course WHERE id = ?";
  const queryUpdate = "UPDATE course SET? WHERE id = ?";

  updateCourse(res, querySearch, queryUpdate, req.params.id, data);
};

exports.deleteData = (req, res) => {
  const data = { ...req.body };
  const querySearch = "SELECT * FROM course WHER id=?";
  const queryDelete = "DELETE FROM course WHERE id = ?";

  deleteCourse(res, querySearch, queryDelete, req.params.id);
};
