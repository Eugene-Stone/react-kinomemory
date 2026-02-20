import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';
import NotFoundPage from './pages/NotFoundPage';
import Films from './pages/Films/Films';
import Privacy from './pages/Privacy/Privacy';
import Film from './pages/Film/Film';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{ path: '*', element: <NotFoundPage /> },
			{ index: true, element: <Home /> },
			{ path: '/privacy', element: <Privacy /> },
			{ path: '/films/:id', element: <Film /> },
		],
	},
]);
