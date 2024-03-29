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

/* Setup ownedStocks like this: 
[{ symbol: AAPL, owned : [{timestamp: mon, boughtPrice: 10$}]}, {symbol : TSLA, owned : [...]}]
*/

module.exports.buy_stock = async (req, res) => {
	const { boughtPrice } = req.body;
	try {
		// Updates the user balance and adds the stock
		await User.updateOne(
			{ id: { $eq: req.params.id } },
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
	const { price, symbol } = req.body;
	const ID = req.params.id;
	try {
		// Checks to see if the user owns the stock or not
		let result = await User.findOne(
			{
				id: ID,
				ownedStocks: { $elemMatch: { symbol: symbol } },
			},
			{
				// $ only returns one subfield
				'ownedStocks.$': 1,
			}
		);

		// If the user owns the stock, remove one
		if (result) {
			const { symbol, boughtPrice, timestamp } = result.ownedStocks[0];
			await User.updateOne(
				{ id: ID },
				{
					$inc: { balance: price },
					$pull: {
						ownedStocks: {
							timestamp: timestamp,
						},
					},
				},
				function (err, doc) {
					if (err) {
						return new Error(err);
					}
				}
			);
			return res.json({ status: true });
		}
		// If not, return a status of false
		return res.json({ status: false, msg: 'You do not own this stock. ' });
	} catch (err) {
		console.log(err);
	}
};
