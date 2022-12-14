import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { buyRoute, sellRoute, userRoute } from '../utils/apiRoutes';
import { formatMoney } from 'accounting';
import axios from 'axios';
import Chart from '../components/Chart';
import Navbar from '../components/Navbar';
import '../App.css';

function Search() {
	const navigate = useNavigate();
	const [stock, setStock] = useState();
	const [user, setUser] = useState(
		localStorage.getItem('user')
			? JSON.parse(localStorage.getItem('user'))
			: ''
	);
	const searchSymbol = useLocation().state?.searchSymbol;
	const [symbol, setSymbol] = useState(searchSymbol ? searchSymbol : '');
	const [ownedStocks, setOwnedStocks] = useState([]);

	// Updates user state with new balance and stock array when buying or selling
	const updateUser = async () => {
		const { data } = await axios.post(`${userRoute}/${user._id}`);
		setUser(data[0]);
		setOwnedStocks(data[0]['ownedStocks']);
		localStorage.setItem('user', JSON.stringify(data[0]));
	};

	useEffect(() => {
		updateUser();
	}, [navigate]);

	const getStock = async (e) => {
		if (e) {
			e.preventDefault();
		}
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

	// Need to memoize stock charts in search

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

		// Check this in the backend
		if (user.balance < parseFloat(stock.price)) {
			alert('You do not have the required funds.');
		}
		const stockInfo = {
			boughtPrice: stock.price,
			timestamp: datetime,
			symbol: stock.symbol,
		};
		try {
			axios.post(`${buyRoute}/${user._id}`, stockInfo);
		} catch (err) {
			console.log(err);
			return;
		}
		updateUser();
	};

	// Update
	const sellStock = () => {
		if (stock.symbol in ownedStocks.symbol) {
			const stockInfo = { price: stock.price, symbol: stock.symbol };
			ownedStocks[stock.symbol].pop(0);
			if (ownedStocks[stock.symbol].length === 0) {
				delete ownedStocks[stock.symbol];
			}
			axios.post(`${sellRoute}/${user._id}`, stockInfo);
		} else {
			alert('You do not own any of this stock.');
		}
	};

	return (
		<div>
			<Navbar
				balance={user?.['balance']}
				user={user?.['username']}
			/>
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
			<button onClick={() => sellStock()}>Sell</button>
			<button onClick={() => console.log(ownedStocks)}>Test</button>
			{formatMoney(user?.balance, '$')}
			{stock ? <Chart stock={stock} /> : <div></div>}
		</div>
	);
}

export default Search;
