var express = require('express');
var router = express.Router();

const { getStocks } = require('../WebScraper');

/* GET stocks listing. */
router.get('/', async function (req, res, next) {
	const data = await getStocks('AAPL', 'TSLA');
	console.log(`The data is ${JSON.stringify(data)}`);
	if (data) {
		return res.json({ data });
	}
});

router.post('/search', async (req, res, next) => {
	console.log(req.body.symbol);
	const data = await getStocks(req.body.symbol);
	try {
		if (data) {
			return res.json({ data, status: true });
		}
	} catch (err) {
		console.log(err);
	}
});

module.exports = router;
