import React, { useState } from 'react';
import axios from 'axios';
import Chart from '../components/Chart';

function Search() {
	const [stock, setStock] = useState();
	const [symbol, setSymbol] = useState('');

	const getStock = async (e) => {
		e.preventDefault();
		console.log(symbol);
		const { data } = await axios.post(
			'http://localhost:5000/stocks/search',
			{
				symbol: symbol,
			}
		);
		if (data.status === true) {
			console.log(data.data[0]);
			setStock(data.data[0]);
		}
	};

	return (
		<div>
			<form onSubmit={(e) => getStock(e)}>
				<input
					type='text'
					placeholder='Enter symbol'
					value={symbol}
					onChange={(e) => setSymbol(e.target.value)}
				/>
				<button type='submit'>Click to Search</button>
			</form>
			{stock ? <Chart stock={stock} /> : <div></div>}
		</div>
	);
}

export default Search;
