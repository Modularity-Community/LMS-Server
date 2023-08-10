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

  const sql = `SELECT course.id, course.name as courseName, course.description,course.thumbnail,course.category_id,course.user_id, category.category,users.name FROM course INNER JOIN category ON course.category_id = category.id INNER JOIN users on course.user_id = users.id WHERE course.id = ${id}`;

  db.query(sql, (err, rows, fields) => {
    if (err) {
      response.responseMessage(res, 500, err.message);
      return;
    }
    if (rows.length === 0) {
      response.responseMessage(res, 500, `data dengan id ${id} tidak ditemukan `);
      return
    }
    response.responseData(res,200,rows,"success")
    console.log(rows);
  });
};
