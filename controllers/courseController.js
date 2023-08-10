const db = require("../connection");
const response = require("../utils/responseHandler");

exports.getListCourse = (req, res) => {
  const sql =
    "SELECT course.id, course.name as courseName, course.description,course.thumbnail,course.category_id,course.user_id, category.category,users.name FROM `course` INNER JOIN category ON course.category_id = category.id INNER JOIN users on course.user_id = users.id";
  db.query(sql, (err, fields) => {
    if (err) {
      response.internalError(res);
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
      response.internalError(res);
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
      response.internalError(res);
      return;
    }

    response.responseData(res, 200, { insertId: fields.insertId }, "success");
  });
};

exports.updateCourse = (req, res) => {
  const id = req.params.courseId;
  const newData = req.body;
  const sql = "UPDATE course SET ? WHERE id = ?";
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
  db.query(sql, [newData, id], (err, fields) => {
    if (err) {
      response.internalError(res);
      return;
    }
    if (fields.affectedRows === 0) {
      response.responseMessage(
        res,
        400,
        `course dengan id ${id} tidak ditemukam`
      );
    }
    console.log(fields);
    response.responseMessage(res, 200, "Berhasil Update Data");
  });
};

exports.deleteCourse = (req, res) => {
  const id = req.params.courseId;
  const sql = "DELETE FROM course WHERE id = ?";
  db.query(sql, [id], (err, fields) => {
    if (err) {
      response.internalError(res);
    }
    if (fields.affectedRows === 0) {
      response.responseMessage(res, 400, `data ${id} tidak ditemukan`);
    }

    response.responseMessage(res, 200, "Berhasil Hapus");
  });
};
