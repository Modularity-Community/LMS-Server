const conn = require("../connection");
const { responseData, responseMessage } = require("../utils/response-handler");

exports.insertCourse = (response, statement, data) => {
  conn.query(statement, data, (err, rows, fields) => {
    if (err) {
      console.log(err.message);
      return responseMessage(response, 500, "internal error");
    }

    responseMessage(response, 201, "Berhasil Insert Data");
  });
};

exports.getAllCourse = (response, statement) => {
  conn.query(statement, (err, rows, fields) => {
    if (err) {
      console.log(err.message);
      return responseMessage(response, 500, "internal error");
    }
    if (!fields?.affectedRows) {
      return responseMessage(response, 404, "data not found");
    }

    return responseData(response, 200, rows);
  });
};

exports.updateCourse = (response, searchStatement, updateStatement, id, data) => {
  conn.query(searchStatement, id, (err, rows, field) => {
    if (err) {
      return responseMessage(response, 500, "internal error");
    }

    if (!rows?.length) {
      return responseMessage(response, 404, "course tidak ditemukan");
    }

    conn.query(updateStatement, [data, id], (err, rows, field) => {
      if (err) {
        return responseMessage(response, 500, "internal error");
      }

      responseMessage(response, 200, "berhasil update course");
    });
  });
};

exports.deleteCourse = (response, searchStatement, deleteStatement, id) => {
  conn.query(searchStatement, id, (err, rows, field) => {
    if (err) {
      return responseMessage(response, 500, "internal error");
    }

    if (!rows?.length) {
      return responseMessage(response, 404, "course tidak ditemukan");
    }

    conn.query(deleteStatement,  id, (err, rows, field) => {
      if (err) {
        return responseMessage(response, 500, "internal error");
      }

      responseMessage(response, 200, "berhasil update course");
    });
  });
};

