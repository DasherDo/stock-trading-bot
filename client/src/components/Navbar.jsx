import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import { formatMoney } from 'accounting';

function Navbar({ balance, user }) {
	const navigate = useNavigate();
	const logout = () => {
		localStorage.removeItem('user');
		navigate('/');
	};

	return (
		<div className='link'>
			Hello, {user}
			<Link to='/'>Home</Link>
			<Link
				to='/search'
				state={{ searchSymbol: '' }}>
				Search
			</Link>
			<Link to='/portfolio'>Profile</Link>
			{user ? (
				<div>Balance: {formatMoney(balance, '$')}</div>
			) : (
				<div></div>
			)}
			<div onClick={() => logout()}>Logout</div>
		</div>
	);
}

export default Navbar;
