const {
	register,
	login,
	user_balance,
} = require('../controllers/userController');
const router = require('express').Router();

router.post('/register', register);
router.post('/login', login);
router.post('/bal', user_balance);

module.exports = router;
