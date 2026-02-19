import { useState, useEffect } from 'react';
import FilmCard from '../../components/FilmCard/FilmCard';
import FilmCardSkeleton from '../../components/FilmCard/FilmCardSkeleton';

import './Films.scss';

function Films() {
	const [films, setFilms] = useState([]);
	const [favorites, setFavorites] = useState([]);
	const [loading, setLoading] = useState(true);
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

	// Удаление избранного
	async function removeFromFavorites(movieId) {
		console.log(movieId);

		const favoriteItem = favorites.find((film) => film.movieId === movieId);

		if (!favoriteItem) return;

		console.log(favoriteItem.id);

		try {
			const response = await fetch(`http://localhost:3001/favorites/${favoriteItem.id}`, {
				method: 'DELETE',
			});

			if (!response.ok) throw new Error('Ошибка удаления');

			setFavorites((prev) => prev.filter((movie) => movie.id !== favoriteItem.id));
		} catch (err) {
			console.error(err);
		}
	}

	if (loading) {
		return (
			<div className="films">
				<h1>Films list</h1>

				<div className="films__list">
					<ul>
						<li>
							<FilmCardSkeleton />
						</li>
						<li>
							<FilmCardSkeleton />
						</li>
						<li>
							<FilmCardSkeleton />
						</li>
						<li>
							<FilmCardSkeleton />
						</li>
					</ul>
				</div>
			</div>
		);
	}

	const favoritesIds = favorites.map((f) => f.movieId);

	const filmsList = films.map((obj, index) => {
		if (favoritesIds.includes(obj.id)) {
			return (
				<FilmCard
					key={obj.id}
					film={obj}
					handleFavorite={removeFromFavorites}
					isFavorite={true}
					loading={loading}
				/>
			);
		} else {
			return (
				<FilmCard
					key={obj.id}
					film={obj}
					handleFavorite={addToFavorites}
					isFavorite={false}
					loading={loading}
				/>
			);
		}
	});

	// if (loading) {
	// 	return <h2>Loading...</h2>;
	// }

	return (
		<>
			<div className="films">
				<h1>Films list</h1>

				<div className="films__list">
					<ul>{filmsList}</ul>
				</div>
			</div>
		</>
	);
}

export default Films;
