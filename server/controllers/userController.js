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
