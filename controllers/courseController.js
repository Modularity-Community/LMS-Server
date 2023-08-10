const db = require("../connection");
const response = require("../utils/responseHandler");

exports.getListCourse = (req, res) => {
  const sql =
    "SELECT course.id, course.name as courseName, course.description,course.thumbnail,course.category_id,course.user_id, category.category,users.name FROM `course` INNER JOIN category ON course.category_id = category.id INNER JOIN users on course.user_id = users.id";
  db.query(sql, (err, fields) => {
    if (err) {
      response.responseMessage(res, 500, "internal server error");
      return;
    }
    if (fields.length === 0) {
      response.responseMessage(res, 404, "data course not found");
      return;
    }
    response.responseData(res, 200, fields, "success");
  });
};

exports.getListCourseById = (req, res) => {
  const id = req.params.courseId;

  const sql =
    "SELECT course.id, course.name as courseName, course.description,course.thumbnail,course.category_id,course.user_id, category.category,users.name FROM course INNER JOIN category ON course.category_id = category.id INNER JOIN users on course.user_id = users.id WHERE course.id = ?";

  db.query(sql, [id], (err, rows, fields) => {
    if (err) {
      response.responseMessage(res, 500, err.message);
      return;
    }
    if (rows.length === 0) {
      response.responseMessage(
        res,
        500,
        `data dengan id ${id} tidak ditemukan `
      );
      return;
    }
    response.responseData(res, 200, rows, "success");
    console.log(rows);
  });
};

exports.insertCourse = (req, res) => {
  const newData = req.body;
  const sql = "INSERT INTO `course` SET ?";
  const requiredFields = [
    "name",
    "description",
    "thumbnail",
    "category_id",
    "user_id",
  ];

  for (const field of requiredFields) {
    if (!newData[field]) {
      return response.responseMessage(res, 400, `${field} tidak boleh kosong`);
    }
  }
  db.query(sql, [newData], (err, fields) => {
    if (err) {
      response.responseMessage(res, 500, err.message);
      return;
    }

    response.responseData(res, 200, {insertId:fields.insertId}, "success");
  });
};

