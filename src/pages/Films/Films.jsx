import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

import './Films.scss';

function Counter() {
	const [films, setFilms] = useState([]);
	const [favorites, setFavorites] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const { modalGlobal } = useOutletContext();
	console.log(modalGlobal);

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
				{/* <img src={obj.poster} alt={obj.id} /> */}
				<img src={obj.poster} alt={obj.id} />
				<button onClick={() => addToFavorites(obj.id)}>Add Favorite</button>

				<button
					onClick={() =>
						modalGlobal.open(
							<>
								<p>{obj.id}</p>
								<p>{obj.title}</p>
								<p>{obj.rating}</p>
								<p>{obj.genre}</p>
								<h2>{obj?.title}</h2>
								<img src={obj?.poster} alt={obj?.title} />
								<a href={obj?.trailer} target="_blank">
									Watch trailer
								</a>
							</>,
						)
					}>
					Open GlobalModal
				</button>

				{/* <button onClick={() => swowModal(obj.id)}>Show trailer</button> */}
				<p>{obj.title}</p>
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
			<div className="films">
				<h1>Films list</h1>

				<div className="films__list">
					<ul>{filmsList}</ul>
				</div>
			</div>

			<br />
			<div className="films">
				<h1>Films Favorite list</h1>

				<div className="films__list">
					<ul>{filmsListFavorite}</ul>
				</div>
			</div>
		</>
	);
}

export default Counter;
