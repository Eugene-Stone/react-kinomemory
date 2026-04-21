import { useState, useEffect } from "react";

export function useMovies() {
	const [films, setFilms] = useState([]);
	const [favorites, setFavorites] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Getting movies and a list of favorites
	useEffect(() => {
		async function fetchData() {
			try {
				setLoading(true);

				const [moviesRes, favoritesRes] = await Promise.all([
					fetch(`http://localhost:3001/movies`),
					fetch(`http://localhost:3001/favorites`),
				]);

				if (!moviesRes.ok) throw new Error("Movies failed");
				if (!favoritesRes.ok) throw new Error("Favorites failed");

				const moviesData = await moviesRes.json();
				const favoritesData = await favoritesRes.json();

				setFilms(moviesData);
				setFavorites(favoritesData);
			} catch (error) {
				setError(error.message);
				console.log(`Ошибка загрузки: ${error}`);
			} finally {
				setLoading(false);
			}
		}

		fetchData();
	}, []);

	// Add to favorites
	async function addToFavorites(movieId, userId) {
		console.log(movieId);

		const alreadyAdded = favorites.find(
			(film) => film.movieId === movieId && film.userId === userId,
		);

		if (alreadyAdded) {
			return;
		}

		try {
			const response = await fetch(`http://localhost:3001/favorites`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ movieId, userId }),
			});

			if (!response.ok) throw new Error("Error adding");

			const newMovie = await response.json();
			setFavorites((prev) => [...prev, newMovie]);
		} catch (err) {
			console.error(err);
		}
	}

	// Removing Favorites
	async function removeFromFavorites(movieId, userId) {
		console.log(movieId);

		const favoriteItem = favorites.find(
			(film) => film.movieId === movieId && film.userId === userId,
		);

		if (!favoriteItem) return;

		console.log(favoriteItem.id);

		try {
			const response = await fetch(
				`http://localhost:3001/favorites/${favoriteItem.id}`,
				{
					method: "DELETE",
				},
			);

			if (!response.ok) throw new Error("Error deleting");

			setFavorites((prev) =>
				prev.filter((movie) => movie.id !== favoriteItem.id),
			);
		} catch (err) {
			console.error(err);
		}
	}

	// Adding film
	async function addFilm(user, dataFilm) {
		const userId = user.id;
		const id = Date.now().toString();

		try {
			const response = await fetch(`http://localhost:3001/movies`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ ...dataFilm, id, userId }),
			});

			if (!response.ok) throw new Error("Error adding");

			const newMovie = await response.json();
			setFilms((prev) => [...prev, newMovie]);
			return true;
		} catch (err) {
			console.error(err);
			return false;
		}
	}

	// Remove film
	async function removeFilm(user, filmId) {
		if (!user || user.role !== 'admin') return false;

		try {
			const response = await fetch(`http://localhost:3001/movies/${filmId}`, {
				method: "DELETE",
			});

			if (!response.ok) throw new Error("Error remove");

			setFilms((prev) => prev.filter((film) => film.id !== filmId));
			return true;
		} catch (err) {
			console.error(err);
			return false;
		}
	}

	return {
		films,
		favorites,
		loading,
		error,
		addToFavorites,
		removeFromFavorites,
		addFilm,
		removeFilm,
	};
}
