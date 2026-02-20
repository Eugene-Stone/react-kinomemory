import { useState, useEffect, useMemo } from "react";

export function useMoviesFilter(films, favorites) {
	const [sortType, setSortType] = useState(() => {
		return localStorage.getItem("sortType") || "alphabet";
	});

	useEffect(() => {
		localStorage.setItem("sortType", sortType);
	}, [sortType]);


	const favoritesIds = favorites.map((f) => f.movieId);
	const sortedFilms = useMemo(() => {
		let copyArray = [...films];

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
	}, [films, sortType, favoritesIds]);

	return {
		sortType,
		setSortType,
		favoritesIds,
		sortedFilms
	};
}
