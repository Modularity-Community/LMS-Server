const {
  createData,
  readData,
  readDataById,
  updateData,
  deleteData,
} = require("../controllers/bootcamp-controller");
const express = require("express");
const router = express.Router();

router.route("/")
      .post(createData)
      .get(readData);

router.route("/:id")
      .get(readDataById)
      .put(updateData)
      .delete(deleteData);

module.exports = router;
