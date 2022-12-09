const User = require('../models/user');
const bcrypt = require('bcrypt');
const async = require('async');

module.exports.register = async (req, res, next) => {
	console.log('Register');
	const { username, password } = req.body;
	const usernameCheck = await User.findOne({ username });
	if (usernameCheck) {
		return res.json({ msg: 'Username Taken', status: false });
	}
	const hashedPassword = await bcrypt.hash(password, 10);
	const user = User.create({
		username,
		password: hashedPassword,
	});
	delete user.password;
	return res.json({ status: true, user });
};

module.exports.login = async (req, res, next) => {
	const { username, password } = req.body;
	const user = await User.findOne({ username });
	if (!user) {
		return res.json({
			msg: 'Incorrect username or password',
			status: false,
		});
	}
	const passwordCheck = await bcrypt.compare(password, user.password);
	if (!passwordCheck) {
		return res.json({
			msg: 'Incorrect username or password',
			status: false,
		});
	}
	user.password = undefined;
	console.log('Login successful');
	return res.json({ msg: 'Login successful', status: true, user });
};

module.exports.user_info = async (req, res) => {
	console.log('working');
	try {
		await User.find({
			id: { $ne: req.params.id },
		})
			.select('ownedStocks balance username')
			.exec((err, results) => {
				console.log(results);
				return res.json(results);
			});
	} catch (err) {
		console.log(err);
	}
};

module.exports.user_balance = async (req, res) => {
	try {
		await User.find({ id: { $ne: req.params.id } })
			.select('balance')
			.exec((err, results) => {
				return res.json(results);
			});
	} catch (err) {
		next(err);
	}
};

module.exports.buy_stock = async (req, res) => {
	const { boughtPrice, timestamp, symbol } = req.body;
	try {
		// Updates the user balance and adds the stock
		await User.updateOne(
			{ id: { $ne: req.params.id } },
			{
				$inc: { balance: -boughtPrice },
				$push: { ownedStocks: req.body },
			},
			function (err, doc) {
				if (err) {
					return new Error(err);
				}
				console.log('Balance updated');
			}
		);
	} catch (err) {
		console.log(err);
	}
};

module.exports.sell_stock = async (req, res) => {
	const { cost } = req.body;
	try {
		await User.updateOne(
			{ id: { $ne: req.params.id } },
			{ $inc: { balance: cost } },
			function (err, doc) {
				if (err) {
					return new Error(err);
				}
				console.log('Balance updated');
			}
		);
	} catch (err) {
		console.log(err);
	}
};
