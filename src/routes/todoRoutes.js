const router = require('express').Router();
const todoControllers = require('../controllers').todo;
const verifyUser = require('../configs/verify');

router.get('/', verifyUser.isLogin, todoControllers.getTodo);
router.get('/todo/add', verifyUser.isLogin, todoControllers.formTodo);
router.post('/todo/save', verifyUser.isLogin, todoControllers.saveTodo);
router.get('/todo/edit/:id', verifyUser.isLogin, todoControllers.editTodo);
router.post('/todo/update/:id', verifyUser.isLogin, todoControllers.updateTodo);
router.get('/todo/delete/:id', verifyUser.isLogin, todoControllers.deleteTodo);

module.exports = router;