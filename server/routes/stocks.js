var express = require('express');
var router = express.Router();

const { getStocks } = require('../WebScraper');

/* GET stocks listing. */
router.get('/', async function (req, res, next) {
	data = await getStocks('AAPL', 'TSLA');
	console.log(`The data is ${JSON.stringify(data)}`);
	if (data) {
		return res.json({ data });
	}
});

module.exports = router;
