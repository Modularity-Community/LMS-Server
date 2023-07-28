const { response } = require("express");

const responseData = function (response,statusCode,values) {
  var data = {
    success: true,
    data:values,
  };
  response.status(statusCode,values)
  response.end;
}