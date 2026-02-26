import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { useMovies } from './hooks/useMovies';
import { useMoviesFilter } from './hooks/useMoviesFilter';
// import { useDebounce } from './hooks/useDebounce';

import Header from './components/Header/Header';
import Modal from './components/Modal/Modal';

export default function Layout() {
	const [searchQuery, setSearchQuery] = useState('');
	const moviesData = useMovies();

	// const searchQueryDebounce = useDebounce(searchQuery, 700);

	const moviesFilterData = useMoviesFilter(
		moviesData.films,
		moviesData.favorites,
		searchQuery,
		// searchQueryDebounce,
	);

	return (
		<>
			<Header
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
				films={moviesData.films}
			/>

			<Outlet
				context={{
					// searchQueryDebounce,
					// searchQuery,
					...moviesData,
					...moviesFilterData,
				}}
			/>

			<Modal />
		</>
	);
}
