import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Search from './pages/Search';

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
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
