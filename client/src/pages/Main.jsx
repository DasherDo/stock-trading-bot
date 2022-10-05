import '../App.css';
import React, { useState } from 'react';
import axios from 'axios';
import Chart from '../components/Chart';
import Navbar from '../components/Navbar';
import { useEffect } from 'react';

function Main() {
	const [stocks, setStocks] = useState(
		sessionStorage.getItem('main-stocks')
			? JSON.parse(sessionStorage.getItem('main-stocks'))
			: null
	);

	const getData = async () => {
		if (stocks === null) {
			const data = await axios.get('http://localhost:5000/stocks');
			setStocks(data.data.data);
			sessionStorage.setItem(
				'main-stocks',
				JSON.stringify(data.data.data)
			);
		}
		return;
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<div className='App'>
			<Navbar
				balance={JSON.parse(localStorage.getItem('user-balance'))}
			/>
			<div className='stock-container'>
				{stocks ? (
					stocks.map((item) => {
						return (
							<Chart
								stock={item}
								clickable={true}
							/>
						);
					})
				) : (
					<div>Loading . . .</div>
				)}
			</div>
		</div>
	);
}

export default Main;
