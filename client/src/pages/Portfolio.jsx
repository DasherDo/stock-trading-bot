import React, { useState, useEffect } from 'react';
import { formatMoney } from 'accounting';

function Portfolio() {
	const [balance, setBalance] = useState(
		localStorage.getItem('user-balance')
	);

	useEffect(() => {
		localStorage.setItem('user-balance', balance);
	}, [balance]);

	return (
		<div>
			<button
				onClick={() => {
					setBalance(!balance ? 500 : parseInt(balance) + 500);
				}}>
				Click Here
			</button>
			<button
				onClick={() => {
					localStorage.removeItem('user-balance');
					setBalance(500);
				}}>
				Reset
			</button>
			{formatMoney(balance, '$')}
		</div>
	);
}

export default Portfolio;
