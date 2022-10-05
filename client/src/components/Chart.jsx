import React from 'react';
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
import '../App.css';
import { useNavigate } from 'react-router-dom';

function Chart(stock) {
	ChartJS.register(
		CategoryScale,
		LinearScale,
		PointElement,
		LineElement,
		Title,
		Tooltip,
		Legend
	);

	const naviagte = useNavigate();

	const search = (symbol) => {
		naviagte('/search', { state: { searchSymbol: symbol } });
	};

	const makeChart = ({ stock, clickable = false }) => {
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

		if (!clickable) {
			return (
				<Line
					options={options}
					data={data}
					key={stock.symbol}
					className='chart'
				/>
			);
		}

		return (
			<div>
				<Line
					options={options}
					data={data}
					key={stock.symbol}
					className='chart'
					onClick={() => search(stock.symbol)}></Line>
			</div>
		);
	};

	return <div>{makeChart(stock)}</div>;
}

export default Chart;
