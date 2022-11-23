import '../App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from '../components/Chart';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { balRoute } from '../utils/apiRoutes';

function Main() {
	const navigate = useNavigate();
	const [user, setUser] = useState(
		JSON.parse(localStorage.getItem('user'))
			? localStorage.getItem('user')
			: ''
	);

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

	useEffect(() => {
		setUser(JSON.parse(localStorage.getItem('user')));
	}, [navigate]);

	return (
		<div className='App'>
			<Navbar
				balance={user?.['balance']}
				user={user?.['username']}
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
