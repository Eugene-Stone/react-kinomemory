import { useState, useEffect } from "react";

export function useMovies() {
	const [films, setFilms] = useState([]);
	const [favorites, setFavorites] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// // Getting a list of movies
	// useEffect(() => {
	// 	async function fetchFavorites() {
	// 		try {
	// 			setLoading(true);
	// 			const response = await fetch(`http://localhost:3001/movies`);
	// 			if (!response.ok) throw new Error("Ошибка загрузки");
	// 			const data = await response.json();
	// 			setFilms(data);
	// 		} catch (err) {
	// 			setError(err.message);
	// 		} finally {
	// 			setLoading(false);
	// 		}
	// 	}

	// 	fetchFavorites();
	// }, []);

	// // Getting Favorites
	// useEffect(() => {
	// 	async function fetchFavorites() {
	// 		try {
	// 			setLoading(true);
	// 			const response = await fetch(`http://localhost:3001/favorites`);
	// 			if (!response.ok) throw new Error("Ошибка загрузки");
	// 			const data = await response.json();
	// 			setFavorites(data);
	// 		} catch (err) {
	// 			setError(err.message);
	// 		} finally {
	// 			setLoading(false);
	// 		}
	// 	}

	// 	fetchFavorites();
	// }, []);

	// Getting movies and a list of favorites
	// useEffect(() => {
	// 	async function fetchData() {
	// 		try {
	// 			setLoading(true);

	// 			const results = await Promise.allSettled([
	// 			fetch('http://localhost:3001/movies'),
	// 			fetch('http://localhost:3001/favorites'),
	// 			]);

	// 			const moviesResult = results[0];
	// 			const favoritesResult = results[1];

	// 			if (moviesResult.status === 'fulfilled') {
	// 			const moviesData = await moviesResult.value.json();
	// 			setFilms(moviesData);
	// 			}

	// 			if (favoritesResult.status === 'fulfilled') {
	// 			const favoritesData = await favoritesResult.value.json();
	// 			setFavorites(favoritesData);
	// 			} else {
	// 			setFavorites([]); // если избранное не загрузилось
	// 			}

	// 		} catch (err) {
	// 			setError('Критическая ошибка загрузки');
	// 		} finally {
	// 			setLoading(false);
	// 		}
	// 	}

	// 	fetchData();
	// }, []);

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
	async function addToFavorites(movieId) {
		console.log(movieId);

		const alreadyAdded = favorites.find((film) => film.movieId === movieId);

		if (alreadyAdded) {
			return;
		}

		try {
			const response = await fetch(`http://localhost:3001/favorites`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ movieId }),
			});

			if (!response.ok) throw new Error("Error adding");

			const newMovie = await response.json();
			setFavorites((prev) => [...prev, newMovie]);
		} catch (err) {
			console.error(err);
		}
	}

	// Removing Favorites
	async function removeFromFavorites(movieId) {
		console.log(movieId);

		const favoriteItem = favorites.find((film) => film.movieId === movieId);

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


	
	return {
		films,
		favorites,
		loading,
		error,
		addToFavorites,
		removeFromFavorites
	};
}
