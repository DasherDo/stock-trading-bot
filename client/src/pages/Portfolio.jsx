import React, { useState, useEffect, useCallback } from 'react';
import { formatMoney } from 'accounting';
import Navbar from '../components/Navbar';
import '../App.css';
import Chart from '../components/Chart';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Portfolio() {
	const navigate = useNavigate();
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
	const [stockCharts, setStockCharts] = useState();
	const [user, setUser] = useState();

	useEffect(() => {
		localStorage.setItem('user-balance', balance);
		setStocks(JSON.parse(localStorage.getItem('user-stocks')));
	}, [balance]);

	const getStocks = useCallback(async () => {
		const symbols = Object.keys(stocks);
		const { data } = await axios.post(
			'http://localhost:5000/stocks/search',
			{
				symbol: symbols,
			}
		);
		if (data.status === true) {
			console.log(data.data);
			setStockCharts(data.data);
		}
	}, [stocks]);

	useEffect(() => {
		if (!localStorage.getItem('user')) {
			navigate('/login');
		}
		setUser(JSON.parse(localStorage.getItem('user')));
	}, [navigate]);

	useEffect(() => {
		getStocks();
	}, [getStocks]);

	const listStocks = () => {
		let list = [];
		for (const [key, value] of Object.entries(stocks)) {
			list.push(
				value.map((item) => {
					return (
						<div key={item.timestamp}>
							{key} bought at {item.boughtPrice}$
						</div>
					);
				})
			);
		}
		return list;
	};

	return (
		<div>
			<Navbar balance={balance} user={user}/>
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
			{formatMoney(balance, '$')}
			<div className='main'>
				<div className='charts'>
					{stockCharts &&
						stockCharts.map((item) => {
							return <Chart stock={item} />;
						})}
				</div>

				{stocks && (
					<div className='history'>
						<div id='history-title'>Purchase History</div>
						<div className='list'>{listStocks()}</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default Portfolio;
