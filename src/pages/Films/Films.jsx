import { useOutletContext } from 'react-router-dom';
// import { useMovies } from '../../hooks/useMovies';
// import { useMoviesFilter } from '../../hooks/useMoviesFilter';
// import { useDebounce } from '../../hooks/useDebounce';
import FilmCard from '../../components/FilmCard/FilmCard';
import FilmsFilters from '../../components/FilmsFilters/FilmsFilters';
import FilmCardSkeleton from '../../components/FilmCard/FilmCardSkeleton';

import './Films.scss';

function Films() {
	const {
		searchQuery,
		films,
		favorites,
		loading,
		error,
		addToFavorites,
		removeFromFavorites,
		sortType,
		setSortType,
		favoritesIds,
		sortedFilms,
		onlyFavorites,
		setOnlyFavorites,
		ratingOverNine,
		setRatingOverNine,
		genre,
		setGenre,
		genreList,
	} = useOutletContext();

	// const searchQueryDebounce = useDebounce(searchQuery, 700);

	// const {
	// sortType,
	// setSortType,
	// favoritesIds,
	// sortedFilms,
	// onlyFavorites,
	// setOnlyFavorites,
	// ratingOverNine,
	// setRatingOverNine,
	// genre,
	// setGenre,
	// genreList,
	// } = useMoviesFilter(films, favorites, searchQueryDebounce);

	// console.log(genreList);
	// console.log(`ratingOverNine - ${ratingOverNine}`);

	// const filmsList = films.map((obj, index) => {
	const filmsList = sortedFilms.map((obj, index) => {
		const isFavorite = favoritesIds.includes(obj.id);

		return (
			<FilmCard
				key={obj.id}
				film={obj}
				handleFavorite={isFavorite ? removeFromFavorites : addToFavorites}
				isFavorite={isFavorite && true}
				loading={loading}
			/>
		);
	});

	const loadingSkeleton = Array.from({ length: 8 }, (_, i) => (
		<li key={i}>
			<FilmCardSkeleton />
		</li>
	));

	// Or like this
	// const loadingSkeleton = [...Array(8)].map((_, i) => (
	// 	<li key={i}>
	// 			<FilmCardSkeleton />
	// 	</li>
	// ));

	return (
		<div className="films">
			<div className="films__top">
				<h1>Films {onlyFavorites && 'favorites'}</h1>

				<div className="select">
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
				<FilmsFilters
					onlyFavorites={onlyFavorites}
					setOnlyFavorites={setOnlyFavorites}
					ratingOverNine={ratingOverNine}
					setRatingOverNine={setRatingOverNine}
					genre={genre}
					setGenre={setGenre}
					genreList={genreList}
				/>

				{loading ? (
					<ul className="films__list">{loadingSkeleton}</ul>
				) : (
					<ul className="films__list">{filmsList}</ul>
				)}
			</div>
		</div>
	);
}

export default Films;
