import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import FilmCard from '../../components/FilmCard/FilmCard';
import FilmCardSkeleton from '../../components/FilmCard/FilmCardSkeleton';

import './FilmsFavorite.scss';

function FilmsFavorite() {
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

	const filmsListFavorite = films
		.filter((film) => favoritesIds.includes(film.id))
		.map((film) => (
			<FilmCard
				key={film.id}
				film={film}
				handleFavorite={removeFromFavorites}
				isFavorite={true}
			/>
		));

	if (!loading) {
		<div className="films">
			<h1>Films Favorite list</h1>

			<div className="films__list">
				{filmsListFavorite.length >= 1 ? (
					<ul>{filmsListFavorite}</ul>
				) : (
					<p>
						Your favorite list empty. Choice your{' '}
						<Link to={'/films'}>first favorite film</Link>
					</p>
				)}
			</div>
		</div>;
	}
}

export default FilmsFavorite;
