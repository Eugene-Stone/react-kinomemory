import { useState, useMemo, useEffect } from 'react';
import { useMovies } from '../../hooks/useMovies';
import FilmCard from '../../components/FilmCard/FilmCard';
import FilmCardSkeleton from '../../components/FilmCard/FilmCardSkeleton';

import './Films.scss';

function Films() {
	const { films, favorites, loading, error, addToFavorites, removeFromFavorites } = useMovies();
	// const [sortType, setSortType] = useState('alphabet');
	const [sortType, setSortType] = useState(() => {
		return localStorage.getItem('sortType') || 'alphabet';
	});

	useEffect(() => {
		localStorage.setItem('sortType', sortType);
	}, [sortType]);

	// const sortedFilms = [...films];
	// if (sortType === 'alphabet') {
	// 	// sortedFilms.sort((a, b) => a.title.localeCompare(b).title);
	// 	sortedFilms.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
	// }
	// if (sortType === 'rating') {
	// 	// sortedFilms.sort((a, b) => b.rating - a.rating);
	// 	sortedFilms.sort((a, b) => Number(b.rating) - Number(a.rating));
	// }
	// if (sortType === 'favorite') {
	// 	sortedFilms.sort((a, b) => {
	// 		const aFav = favoritesIds.includes(a.id);
	// 		const bFav = favoritesIds.includes(b.id);
	// 		return bFav - aFav;
	// 	});
	// }

	const favoritesIds = favorites.map((f) => f.movieId);

	const sortedFilms = useMemo(() => {
		let copyArray = [...films];

		if (sortType === 'alphabet') {
			// sortedFilms.sort((a, b) => a.title.localeCompare(b).title);
			copyArray.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
		}
		// if (sortType === 'rating') {
		// 	// sortedFilms.sort((a, b) => b.rating - a.rating);
		// 	copyArray.sort((a, b) => Number(b.rating) - Number(a.rating));
		// }

		if (sortType === 'ratingDescending') {
			copyArray.sort((a, b) => Number(b.rating) - Number(a.rating));
		}
		if (sortType === 'ratingAscending') {
			copyArray.sort((a, b) => Number(a.rating) - Number(b.rating));
		}
		if (sortType === 'favorite') {
			copyArray.sort((a, b) => {
				const aFav = favoritesIds.includes(a.id);
				const bFav = favoritesIds.includes(b.id);
				return bFav - aFav;
			});
		}

		return copyArray;
	}, [films, sortType, favoritesIds]);

	// const filmsList = films.map((obj, index) => {
	const filmsList = sortedFilms.map((obj, index) => {
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

	if (loading) {
		const loadingSkeleton = Array.from({ length: 8 }, (_, i) => (
			<li key={i}>
				<FilmCardSkeleton />
			</li>
		));

		// Or like this
		/* const loadingSkeleton = [...Array(8)].map((_, i) => (
			<li key={i}>
					<FilmCardSkeleton />
			</li>
		)); */

		return (
			<div className="films">
				<h1>Films list loading</h1>

				<div className="films__list">
					<ul>{loadingSkeleton}</ul>
				</div>
			</div>
		);
	}

	return (
		<div className="films">
			<div className="films__top">
				<h1>Films list</h1>

				<div className="sorting">
					<span>Sorting:</span>
					<select
						name="#sorting"
						value={sortType}
						onChange={(e) => setSortType(e.target.value)}>
						<option value="alphabet">Alphabet</option>
						{/* <option value="favorite">In favorites</option> */}
						<option value="ratingDescending">Rating descending</option>
						<option value="ratingAscending">Rating ascending</option>
					</select>
				</div>
			</div>

			<div className="films__list-box">
				<div className="films__filter-box">
					<ul className="films__filter">
						<li className="films__filter-item">
							<button className="btn films__filter-btn">In favorites</button>
						</li>
						<li className="films__filter-item">
							<button className="btn films__filter-btn active">Rating over 9</button>
						</li>
					</ul>

					<div className="sorting">
						<span>Genre:</span>
						<select name="#genre">
							<option value="All genre">All genre</option>
							<option value="Drama">Drama</option>
							<option value="Crime">Crime</option>
							<option value="Thriller">Thriller</option>
						</select>
					</div>
				</div>

				<ul className="films__list">{filmsList}</ul>
			</div>
		</div>
	);
}

export default Films;
