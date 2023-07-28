const { response } = require("express");

const responseData = function (response, statusCode, values,status) {
  var data = {
    status: status,
    data: values,
  };
  response.status(statusCode, values).json(data);
  response.end;
};

const responseMessage = function (response, statusCode, message,status) {
  var data = {
    statu: status,
    message: message,
  };
  response.status(statusCode).json(data);
  response.end;
};

module.exports = { responseData, responseMessage };
