import '../App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from '../components/Chart';
import Navbar from '../components/Navbar';

function Main() {
	const [stocks, setStocks] = useState();

	const getData = async () => {
		const data = await axios.get('http://localhost:5000/stocks');
		setStocks(data.data.data);
	};

	//Commented out for development
	// useEffect(() => {
	// 	getData();
	// }, []);

	return (
		<div className='App'>
			<Navbar />
			{/* {stocks ? (
				stocks.map((item) => {
					return makeChart(item);
				})
			) : (
				<div> Loading . . .</div>
			)} */}
			{stocks ? (
				stocks.map((item) => {
					return <Chart stock={item} />;
				})
			) : (
				<div>Loading . . .</div>
			)}
		</div>
	);
}

export default Main;
