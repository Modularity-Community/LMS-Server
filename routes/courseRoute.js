const { 
  createData, 
  readData, 
  updateData, 
  deleteData 
} = require('../controllers/bootcamp-controller');
const express = require('express');
const router = express.Router();

router.route('/course')
  .post(createData)
  .get(readData);

router.route('/course/:id')
  .put(updateData)
  .delete(deleteData);

module.exports = router;