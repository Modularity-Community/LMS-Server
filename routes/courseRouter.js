const {
  createData,
  readData,
  readDataById,
  updateData,
  deleteData,
} = require("../controllers/courseController");
const express = require("express");
const router = express.Router();

router.post("/", createData);
router.get("/", readData);
router.get("/:id", readDataById);
router.update("/:id", updateData);
router.delete("/:id", deleteData);

module.exports = router;
