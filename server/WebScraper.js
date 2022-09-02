require('dotenv').config();
const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

const AAPL = process.env.AAPL;
const TSLA = process.env.TSLA;
const INTERVAL = 60 * 1000;
let stocks = {};

const initialValues = async (url, symbol) => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	try {
		await page.goto(url, { timeout: 180000 });
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
		const stock = {
			price: price,
			prevClosePrice: prevClosePrice,
			openPrice: openPrice,
		};
		stocks = { ...stocks, [symbol]: stock };
		console.log(stocks);
		return false;
	} catch (err) {
		console.log(err);
	}
};

initialValues(AAPL, 'AAPL');
initialValues(TSLA, 'TSLA');
