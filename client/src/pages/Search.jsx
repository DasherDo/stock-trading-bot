import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from '../components/Chart';
import Navbar from '../components/Navbar';
import '../App.css';

function Search() {
	const [stock, setStock] = useState();
	const [symbol, setSymbol] = useState('');
	const [balance, setBalance] = useState(
		localStorage.getItem('user-balance')
	);
	const [ownedStocks, setOwnedStocks] = useState(
		localStorage.getItem('user-stocks')
			? [localStorage.getItem('user-stocks')]
			: []
	);

	const getStock = async (e) => {
		e.preventDefault();
		const { data } = await axios.post(
			'http://localhost:5000/stocks/search',
			{
				symbol: symbol,
			}
		);
		if (data.status === true) {
			console.log(data.data[0]);
			setStock(data.data[0]);
			setSymbol('');
		}
	};

	useEffect(() => {
		localStorage.setItem('user-balance', balance);
	}, [balance]);

	const buyStock = () => {
		const currentdate = new Date();
		const datetime =
			currentdate.getMonth() +
			1 +
			'/' +
			currentdate.getDate() +
			'/' +
			currentdate.getFullYear() +
			' @ ' +
			(currentdate.getHours() % 12) +
			':' +
			currentdate.getMinutes() +
			':' +
			currentdate.getSeconds();
		if (balance > parseFloat(stock.price)) {
			setBalance(
				parseFloat(
					(parseFloat(balance) - parseFloat(stock.price)).toFixed(2)
				)
			);

			setOwnedStocks([
				...ownedStocks,
				{
					symbol: stock.symbol,
					boughtPrice: stock.price,
					timestamp: datetime,
				},
			]);

			localStorage.setItem('user-stocks', JSON.stringify(ownedStocks));
			return;
		}
		alert('You do not have the required funds.');
	};

	return (
		<div>
			<Navbar balance={balance} />
			<div className='search'>
				<form
					onSubmit={(e) => getStock(e)}
					className='search-form'>
					<input
						type='text'
						placeholder='Enter symbol'
						value={symbol}
						onChange={(e) => setSymbol(e.target.value)}
					/>
					<button type='submit'>Search</button>
				</form>
			</div>
			<button onClick={() => buyStock()}>Buy</button>
			{balance}
			{stock ? <Chart stock={stock} /> : <div></div>}
		</div>
	);
}

export default Search;
