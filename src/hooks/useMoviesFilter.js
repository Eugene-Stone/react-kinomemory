import { useState, useEffect, useMemo } from "react";

export function useMoviesFilter(films, favorites, searchQuery) {
	const [onlyFavorites, setOnlyFavorites] = useState(false);
	const [ratingOverNine, setRatingOverNine] = useState(false);
	const [genre, setGenre] = useState("All genre");

	// For pagination
	const [currentPage, setCurrentPage] = useState(1);
	const limitPerPage = 4;

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
			copyArray = copyArray.filter((film) => film.rating >= 9);
		}

		if (genre !== "All genre") {
			copyArray = copyArray.filter(
				(film) => film.genre.toLowerCase() === genre.toLowerCase(),
			);
		}
		console.log(searchQuery);
		if (searchQuery !== "") {
			copyArray = copyArray.filter((film) =>
				film.title.toLowerCase().includes(searchQuery.toLowerCase()),
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

		// Pagination
		const totalPages = Math.ceil(copyArray.length / limitPerPage);

		const paginatedFilms = copyArray.slice(
			(currentPage - 1) * limitPerPage,
			currentPage * limitPerPage,
		);

		copyArray = paginatedFilms;

		return { array: copyArray, total: totalPages };
	}, [
		films,
		sortType,
		favoritesIds,
		onlyFavorites,
		ratingOverNine,
		genre,
		searchQuery,
		currentPage,
	]);

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
		currentPage,
		setCurrentPage,
		limitPerPage,
	};
}
