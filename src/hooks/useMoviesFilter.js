import { useState, useEffect, useMemo } from "react";

export function useMoviesFilter(films, favorites) {
	const [onlyFavorites, setOnlyFavorites] = useState(false);
	const [ratingOverNine, setRatingOverNine] = useState(false);
	const [genre, setGenre] = useState("All genre");

	const [sortType, setSortType] = useState(() => {
		return localStorage.getItem("sortType") || "alphabet";
	});

	useEffect(() => {
		localStorage.setItem("sortType", sortType);
	}, [sortType]);

	// const genreList = films.map((film)=>film.genre);
	// Собираем жанры пропуская дубликаты
	const genreList = [...new Set(films.map((film) => film.genre))];

	const favoritesIds = favorites.map((f) => f.movieId);

	const sortedFilms = useMemo(() => {
		let copyArray = [...films];

		if (onlyFavorites) {
			copyArray = copyArray.filter((film) =>
				favoritesIds.includes(film.id),
			);
		}

		if (ratingOverNine) {
			copyArray = copyArray.filter((film) => film.rating > 9);
		}

		if (genre !== "All genre") {
			copyArray = copyArray.filter(
				(film) => film.genre.toLowerCase() === genre.toLowerCase(),
			);
		}

		if (sortType === "alphabet") {
			// sortedFilms.sort((a, b) => a.title.localeCompare(b).title);
			copyArray.sort((a, b) =>
				a.title.toLowerCase().localeCompare(b.title.toLowerCase()),
			);
		}
		if (sortType === "ratingDescending") {
			copyArray.sort((a, b) => Number(b.rating) - Number(a.rating));
		}
		if (sortType === "ratingAscending") {
			copyArray.sort((a, b) => Number(a.rating) - Number(b.rating));
		}
		if (sortType === "favorite") {
			copyArray.sort((a, b) => {
				const aFav = favoritesIds.includes(a.id);
				const bFav = favoritesIds.includes(b.id);
				return bFav - aFav;
			});
		}

		return copyArray;
	}, [films, sortType, favoritesIds, onlyFavorites, ratingOverNine, genre]);

	return {
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
	};
}
