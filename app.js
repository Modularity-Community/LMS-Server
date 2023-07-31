const express = require("express");
const bodyParser = require("body-parser");
const conn = require("./connection");
const app = express();
const {responseData,responseMessage} = require("./utils/response-handler")
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 5000;
// set body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//set route

//course
// app.use('/api/course', courseRouter);
app.get("/course", (req, res) => {
  const querySql = "SELECT * FROM course";
  conn.query(querySql, (err, rows, fields) => {
    if (err) {
      console.log(err.message);
      return responseMessage(res, 500, "internal error");
    }
    if (!fields?.affectedRows) {
      return responseMessage(res, 404, "data not found");
    }

    return responseData(res, 200, rows);
  });
});
app.get("/course/:id", (req, res) => {
  const id = req.params.id;
  const querySql = `SELECT * FROM course WHERE id = ${id} `;
  conn.query(querySql, (err, rows, fields) => {
    if (err) {
      console.log(err.message);
      return responseMessage(res, 500, "internal error");
    }
    if (!fields?.affectedRows) {
      return responseMessage(res, 404, "data not found");
    }

    return responseData(res, 200, rows);
  });
});

app.post("/course",(req,res) => {
  const {name,description,thumbnail,category_id,user_id} = req.body;
  const querySql = `INSERT INTO course(name, description, thumbnail, category_id, user_id) VALUES ('${name}','${description}','${thumbnail}','${category_id}','${user_id}')`;
  conn.query(querySql, (err, fields) => {
    if (err) {
      console.log(err.message);
      return responseMessage(res, 500, "internal error");
    }
    if (!fields?.affectedRows) {
      return responseMessage(res, 400, "data tidak boleh kosong");
    }
 
    responseData(res,200,fields.inserId)
    return responseMessage(res, 200, "anu");
  });
})
app.put("/course/:id",(req,res) => {
  const {id,name,description,thumbnail,category_id,user_id} = req.body;
  const querySql =`UPDATE course SET 
  name ='${name}',
  description='${description}',
  thumbnail='${thumbnail}',
  category_id='${category_id}',
  user_id='${user_id}'
  WHERE id = '${id}'
  `;
  conn.query(querySql, (err,fields) => {
    if (err) {
      console.log(err.message);
      return responseMessage(res, 500, "internal error","failed");
    }
    if (!fields?.affectedRows) {
      return responseMessage(res, 404, "user not found ","failed");
    }
 
    responseData(res,200,fields.affectedRows,'success')
    return responseMessage(res, 200, fields.message,'success');
  });
})
app.delete("/course/:id",(req,res) => {
  const {id} = req.body;
  const querySql =`DELETE FROM course WHERE id = ${id} `;
  conn.query(querySql, (err,fields) => {
    if (err) {
      console.log(err.message);
      return responseMessage(res, 500, "internal error","failed");
    }
    if (!fields?.affectedRows) {
      return responseMessage(res, 404, "user not found ","failed");
    }
 
    responseData(res,200,fields.affectedRows,'success')
    return responseMessage(res, 200, fields.message,'success');
  });
})
// buat server nya
app.listen(PORT, () => console.log(`Server running at port: ${PORT}`));
