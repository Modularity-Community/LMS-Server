const { query } = require("express")
const conn = require("../connection")
const {responseData,responseMessage} =  require('../utils/response-handler')

exports.insert = (response,statement,data) =>{
    conn.query(statement,data,(err,rows,fields) => {
      if (err) {
        console.log(err.message);
        return responseMessage(response,500,'internal error');
      }

      responseMessage(response,201,'Berhasil Insert Data')
    })
}