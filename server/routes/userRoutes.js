const {
	register,
	login,
	user_balance,
	buy_stock,
	sell_stock,
	user_info,
} = require('../controllers/userController');
const router = require('express').Router();

router.post('/register', register);
router.post('/login', login);
router.post('/bal', user_balance);
router.post('/info/:id', user_info);
router.post('/stock/sell/:id', sell_stock);
router.post('/stock/buy/:id', buy_stock);

module.exports = router;
