import { useState, useEffect } from 'react';
import { useMovies } from '../../hooks/useMovies';
import { Link } from 'react-router';
import FilmCard from '../../components/FilmCard/FilmCard';

import './FilmsFavorite.scss';

function FilmsFavorite() {
	const { films, favorites, loading, error, addToFavorites, removeFromFavorites } = useMovies();

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

	return (
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
		</div>
	);
}

export default FilmsFavorite;
