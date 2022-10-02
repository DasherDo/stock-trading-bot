require('dotenv').config();
const puppeteer = require('puppeteer');
const util = require('util');

const URL = process.env.URL;
const INTERVAL = 60 * 1000;
// let stocks = {};

const initialValues = async (symbol) => {
	console.log(`Working on ${symbol}`);
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	const fullURL = `${URL}/${symbol}?p=${symbol}`;
	const pastURL = `${URL}/${symbol}/history?p=${symbol}`;
	try {
		await page.goto(fullURL, { timeout: 180000 });
		const prevClosePriceElement = await page.waitForXPath(
			'//*[@id="quote-summary"]/div[1]/table/tbody/tr[1]/td[2]'
		);
		const openPriceElement = await page.waitForXPath(
			'//*[@id="quote-summary"]/div[1]/table/tbody/tr[2]/td[2]'
		);
		const prevClosePrice = await page.evaluate(
			(element) => element.textContent,
			prevClosePriceElement
		);
		const openPrice = await page.evaluate(
			(element) => element.textContent,
			openPriceElement
		);
		const priceElement = await page.waitForXPath(
			'//*[@id="quote-header-info"]/div[3]/div[1]/div/fin-streamer[1]'
		);
		const price = await page.evaluate(
			(element) => element.textContent,
			priceElement
		);
		await page.goto(pastURL, { timeout: 180000 });
		// const d5Element = await page.evaluate(() => {
		// 	let data = [];
		// 	let elements = document.getElementsByClassName(
		// 		'Py(10px) Pstart(10px)'
		// 	);
		// 	for (var element of elements) data.push(element.textContent);
		// 	return data;
		// });
		// console.log(d5Element);
		let history = await page.$$eval('tr', (els) =>
			els
				.slice(2)
				.map((el) =>
					[...el.querySelectorAll('td')].map((e) =>
						e.textContent.trim()
					)
				)
				.slice(0, 5)
		);
		history.forEach((item) => {
			item.splice(1, 4);
			item.pop();
		});
		history.reverse();
		// const dElement = await page.waitForXPath(
		// 	`//*[@id="Col1-1-HistoricalDataTable-Proxy"]/section/div[2]/table/tbody/tr[${i}]/td[5]`
		// );
		history = Object.fromEntries(history);
		const stock = {
			symbol: symbol,
			price: price,
			prevClosePrice: prevClosePrice,
			openPrice: openPrice,
			history: history,
		};
		// stocks = { ...stocks, [symbol]: stock };
		return stock;
	} catch (err) {
		console.log(err);
	}
};

const getStocks = async (...args) => {
	let stocks = [];
	if (args.length === 1) {
		for (const url of args[0]) {
			const stock = await initialValues(url);
			stocks.push(stock); // = { ...stocks, [url]: stock };
		}
	} else {
		for (const url of args) {
			const stock = await initialValues(url);
			stocks.push(stock); // = { ...stocks, [url]: stock };
		}
	}
	return stocks;
};

// getStocks('AAPL', 'TSLA', 'GOOGL');

module.exports = { getStocks };
