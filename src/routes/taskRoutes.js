const express = require('express');
const router = express.Router();
const controller = require('../controllers/taskController');
//:id URL'nin o kısmını değişken yapar!!!!
router.post('/', controller.createTask);
router.get('/', controller.getAllTasks);
router.get('/:id', controller.getTaskById);
router.put('/:id', controller.updateTask);
router.delete('/:id', controller.deleteTask);
module.exports = router;