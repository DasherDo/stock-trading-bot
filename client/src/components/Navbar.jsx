import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Navbar() {
	return (
		<div className='link'>
			<Link to='/'>Home</Link>
			<Link to='/search'>Search</Link>
			<Link to='/portfolio'>Profile</Link>
		</div>
	);
}

export default Navbar;
