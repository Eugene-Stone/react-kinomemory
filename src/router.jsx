import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';
import NotFoundPage from './pages/NotFoundPage';
import Films from './pages/Films/Films';

export const router = createBrowserRouter([
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
