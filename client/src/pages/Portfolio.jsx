import React, { useState, useEffect } from 'react';
import { formatMoney } from 'accounting';
import Navbar from '../components/Navbar';

function Portfolio() {
	const [balance, setBalance] = useState(
		localStorage.getItem('user-balance')
			? localStorage.getItem('user-balance')
			: 0
	);
	const [stocks, setStocks] = useState(
		localStorage.getItem('user-stocks')
			? JSON.parse(localStorage.getItem('user-stocks'))
			: []
	);

	useEffect(() => {
		localStorage.setItem('user-balance', balance);
		setStocks(JSON.parse(localStorage.getItem('user-stocks')));
	}, [balance]);

	return (
		<div>
			<Navbar balance={balance} />
			<button
				onClick={() => {
					setBalance(!balance ? 500 : parseInt(balance) + 500);
				}}>
				Click Here
			</button>
			<button
				onClick={() => {
					localStorage.removeItem('user-balance');
					localStorage.removeItem('user-stocks');
					setBalance(parseInt(500));
				}}>
				Reset
			</button>
			<button
				onClick={() => {
					console.log(stocks);
				}}>
				Show Stocks
			</button>
			<button
				onClick={() => {
					console.log(stocks[0]);
				}}>
				Test
			</button>
			{formatMoney(balance, '$')}
			{stocks &&
				stocks.map((item) => {
					return (
						<div key={item.timestamp}>
							{item.symbol} bought at{' '}
							{formatMoney(item.boughtPrice, '$')} at{' '}
							{item.timestamp}
						</div>
					);
				})}
		</div>
	);
}

export default Portfolio;
