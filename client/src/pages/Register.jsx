import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerRoute } from '../utils/apiRoutes';
import axios from 'axios';
import '../App.css';

function Register() {
	const navigate = useNavigate();

	const [userInfo, setUserInfo] = useState({
		username: '',
		password: '',
		confirmedPassword: '',
	});

	const toastStyle = {
		position: 'bottom-left',
		autoClose: 3000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
	};

	useEffect(() => {
		if (localStorage.getItem('user')) {
			navigate('/');
		}
	}, [navigate]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (handleValidation()) {
			const { username, password } = userInfo;
			const { data } = await axios.post(registerRoute, {
				username,
				password,
			});
			if (data.status === false) {
				toast.error(data.msg, toastStyle);
			}
			if (data.status === true) {
				localStorage.setItem('user', JSON.stringify(data.user));
				navigate('/');
			}
		}
	};

	const handleValidation = () => {
		const { username, password, confirmedPassword } = userInfo;
		if (password !== confirmedPassword) {
			toast.error('The passwords do not match.', toastStyle);
			return false;
		}
		if (username.length < 3) {
			toast.error(
				'Username must be longer than 3 characters',
				toastStyle
			);
			return false;
		}
		return true;
	};

	const handleChange = (e) => {
		setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
	};

	return (
		<div className='register'>
			<form
				onSubmit={(e) => handleSubmit(e)}
				className='form'>
				<input
					type='text'
					placeholder='Username'
					name='username'
					onChange={(e) => handleChange(e)}
				/>
				<input
					type='text'
					placeholder='Password'
					name='password'
					onChange={(e) => handleChange(e)}
				/>
				<input
					type='text'
					placeholder='Confirm Password'
					name='confirmedPassword'
					onChange={(e) => handleChange(e)}
				/>
				<button className='submit'>Submit</button>
				<Link to='/login'>Login</Link>
			</form>
			<ToastContainer />
		</div>
	);
}

export default Register;
