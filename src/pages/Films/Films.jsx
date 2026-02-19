import { useState, useEffect } from 'react';
import './Films.scss';

function Counter() {
	const [films, setFilms] = useState([]);
	const [favorites, setFavorites] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	// Получение списка фильмов
	useEffect(() => {
		async function fetchFavorites() {
			try {
				setLoading(true);
				const response = await fetch(`http://localhost:3001/movies`);
				if (!response.ok) throw new Error('Ошибка загрузки');
				const data = await response.json();
				setFilms(data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		}

		fetchFavorites();
	}, []);

	// Получение избранного
	useEffect(() => {
		async function fetchFavorites() {
			try {
				setLoading(true);
				const response = await fetch(`http://localhost:3001/favorites`);
				if (!response.ok) throw new Error('Ошибка загрузки');
				const data = await response.json();
				setFavorites(data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		}

		fetchFavorites();
	}, []);

	// Добавление в избранное
	async function addToFavorites(movieId) {
		console.log(movieId);

		const alreadyAdded = favorites.find((film) => film.movieId === movieId);

		if (alreadyAdded) {
			return;
		}

		try {
			const response = await fetch(`http://localhost:3001/favorites`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ movieId }),
			});

			if (!response.ok) throw new Error('Ошибка добавления');

			const newMovie = await response.json();
			setFavorites((prev) => [...prev, newMovie]);
		} catch (err) {
			console.error(err);
		}
	}

	// console.log(films);
	// console.log(favorites);

	const filmsList = films.map((obj, index) => {
		return (
			<li key={obj.title}>
				<p>{obj.title}</p>
				<button onClick={() => addToFavorites(obj.id)}>Add Favorite</button>
				{/* <img src={obj.poster} alt={obj.title} /> */}
			</li>
		);
	});
	const favoritesIds = favorites.map((f) => f.movieId);

	// console.log(favoritesIds);

	const filmsListFavorite = films
		.filter((film) => favoritesIds.includes(film.id))
		.map((film) => <li key={film.title}>{film.title}</li>);

	// console.log(filmsListFavorite);

	return (
		<>
			<h1>Films list</h1>
			<ul>{filmsList}</ul>
			<br />
			<h1>Films Favorite list</h1>
			<ul>{filmsListFavorite}</ul>
		</>
	);
}

export default Counter;
