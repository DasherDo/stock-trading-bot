import '../App.css';
import React, { useState, useEffect } from 'react';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

function Main() {
	ChartJS.register(
		CategoryScale,
		LinearScale,
		PointElement,
		LineElement,
		Title,
		Tooltip,
		Legend
	);

	const [stocks, setStocks] = useState();

	const getData = async () => {
		const data = await axios.get('http://localhost:5000/stocks');
		setStocks(data.data.data);
	};

	useEffect(() => {
		getData();
	}, []);

	const makeChart = (stock) => {
		const history = stock['history'];

		const options = {
			scales: {
				y: {
					beginAtZero: false,
				},
			},
		};

		const data = {
			labels: Object.keys(history),
			datasets: [
				{
					label: stock.symbol,
					data: Object.values(history),
					backgroundColor: [
						'rgba(255, 99, 132, 0.2)',
						'rgba(54, 162, 235, 0.2)',
						'rgba(255, 206, 86, 0.2)',
						'rgba(75, 192, 192, 0.2)',
						'rgba(153, 102, 255, 0.2)',
						'rgba(255, 159, 64, 0.2)',
					],
					borderColor: [
						'rgba(255, 99, 132, 1)',
						'rgba(54, 162, 235, 1)',
						'rgba(255, 206, 86, 1)',
						'rgba(75, 192, 192, 1)',
						'rgba(153, 102, 255, 1)',
						'rgba(255, 159, 64, 1)',
					],
					borderWidth: 1,
				},
			],
		};

		return (
			<Line
				options={options}
				data={data}
				key={stock.symbol}
			/>
		);
	};

	return (
		<div className='App'>
			{stocks ? (
				stocks.map((item) => {
					return makeChart(item);
				})
			) : (
				<div> Loading . . .</div>
			)}
		</div>
	);
}

export default Main;
