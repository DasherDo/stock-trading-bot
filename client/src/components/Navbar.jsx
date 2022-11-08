import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { formatMoney } from 'accounting';

function Navbar({ balance }) {
	return (
		<div className='link'>
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
