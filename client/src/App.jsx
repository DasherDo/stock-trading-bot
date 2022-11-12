import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Search from './pages/Search';
import Portfolio from './pages/Portfolio';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<Routes>
					<Route
						path='/'
						element={<Main />}
					/>
					<Route
						path='/search'
						element={<Search />}
					/>
					<Route
						path='/portfolio'
						element={<Portfolio />}
					/>
					<Route
						path='/login'
						element={<Login />}
					/>
					<Route
						path='/register'
						element={<Register />}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
