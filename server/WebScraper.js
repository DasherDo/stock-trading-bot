require('dotenv').config();
const puppeteer = require('puppeteer');

const AAPL = process.env.AAPL;
const TSLA = process.env.TSLA;
const URL = process.env.URL;
const INTERVAL = 60 * 1000;
let stocks = {};

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
		const d5 = [];
		// const dElement = await page.waitForXPath(
		// 	`//*[@id="Col1-1-HistoricalDataTable-Proxy"]/section/div[2]/table/tbody/tr[${i}]/td[5]`
		// );
		const d = await page.evaluate(
			(element) => element.textContent,
			dElement
		);
		console.log(d);
		const stock = {
			price: price,
			prevClosePrice: prevClosePrice,
			openPrice: openPrice,
			d5: d5,
		};
		stocks = { ...stocks, [symbol]: stock };
		return false;
	} catch (err) {
		console.log(err);
	}
};

const getStocks = async (...args) => {
	for (const url of args) {
		await initialValues(url);
	}
	console.log(stocks);
};

getStocks('AAPL', 'TSLA', 'GOOGL');
