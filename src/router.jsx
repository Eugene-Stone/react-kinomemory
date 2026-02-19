import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';
import NotFoundPage from './pages/NotFoundPage';
import Films from './pages/Films/Films';
import FilmsFavorite from './pages/FilmsFavorite/FilmsFavorite';
import Film from './pages/Film/Film';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{ path: '*', element: <NotFoundPage /> },
			{ index: true, element: <Home /> },
			{ path: '/films', element: <Films /> },
			{ path: '/films-favorite', element: <FilmsFavorite /> },
			{ path: '/films/:id', element: <Film /> },
		],
	},
]);
