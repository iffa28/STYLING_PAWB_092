const router = require('express').Router();
const homeController = require('../controllers').home;
const todoController = require('../controllers').todo;
const verifyUser = require('../configs/verify');

router.get('/', verifyUser.isLogin, homeController.home);
router.get('/todo', verifyUser.isLogin, todoController.getTodo);

module.exports = router;