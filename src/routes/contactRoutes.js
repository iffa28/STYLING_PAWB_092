const router = require('express').Router();
const contactController = require('../controllers').contact;
const verifyUser = require('../configs/verify');

// Route untuk menampilkan halaman kontak
router.get('/', verifyUser.isLogin, contactController.showContactForm);

// Route untuk menangani pengiriman form kontak
router.post('/save', verifyUser.isLogin, contactController.submitContactForm);

module.exports = router;
