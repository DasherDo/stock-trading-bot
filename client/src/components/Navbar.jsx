import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { formatMoney } from 'accounting';

function Navbar({ balance, user }) {
	return (
		<div className='link'>
			Hello {user}
			<Link to='/'>Home</Link>
			<Link
				to='/search'
				state={{ searchSymbol: '' }}>
				Search
			</Link>
			<Link to='/portfolio'>Profile</Link>
			Balance: {formatMoney(balance, '$')}
		</div>
	);
}

export default Navbar;
