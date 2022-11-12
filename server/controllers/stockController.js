const User = require('../models/user');
const Stock = require('../models/stock');

module.exports.add_stock = async (req, res, next) => {
	try {
		const { symbol, boughtPrice, date } = req.body;
	} catch (ex) {
		console.log(ex);
	}
};
