import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Search from './pages/Search';
import Portfolio from './pages/Portfolio';

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
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
