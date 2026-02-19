import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Home from './pages/Home';
import Header from './components/Header/Header';
import NotFoundPage from './pages/NotFoundPage';
import Films from './pages/Films/Films';

// const router = createBrowserRouter([
// 	{ path: '*', element: <NotFoundPage /> },
// 	{ path: '/', element: <Gallery /> },
// 	{ path: '/test', element: <Test /> },
// ]);

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{ path: '*', element: <NotFoundPage /> },
			{ index: true, element: <Home /> },
			{ path: '/films-favorite', element: <Films /> },
			// { path: '/counter/:id', element: <CounterItem /> },
		],
	},
]);

function Layout() {
	const contextCustom = useState(null);

	useEffect(() => {
		console.log('Layout mounted');
	}, []);

	return (
		<>
			<Header />
			<Outlet context={contextCustom} />
		</>
	);
}

function App() {
	return <RouterProvider router={router} />;
}

export default App;
