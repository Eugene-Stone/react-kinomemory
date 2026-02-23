import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { useGlobalModal } from './components/GlobalModal/useGlobalModal';
import { useTheme } from './hooks/useTheme';
import { useMovies } from './hooks/useMovies';
import { useMoviesFilter } from './hooks/useMoviesFilter';
import { useDebounce } from './hooks/useDebounce';

import Header from './components/Header/Header';
import GlobalModal from './components/GlobalModal/GlobalModal';
import ScrollToTopButton from './components/ScrollToTop/ScrollToTop';

export default function Layout() {
	const modalGlobal = useGlobalModal();
	const [searchQuery, setSearchQuery] = useState('');
	const moviesData = useMovies();
	const { isDark, setIsDark } = useTheme();

	// console.log('isDark:', isDark);

	const searchQueryDebounce = useDebounce(searchQuery, 700);

	const moviesFilterData = useMoviesFilter(
		moviesData.films,
		moviesData.favorites,
		searchQueryDebounce,
	);

	// useEffect(() => {
	// 	console.log('Layout mounted');
	// }, []);

	return (
		<>
			<Header
				isDark={isDark}
				setIsDark={setIsDark}
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
			/>
			<Outlet
				context={{ modalGlobal, searchQueryDebounce, ...moviesData, ...moviesFilterData }}
			/>

			<GlobalModal modal={modalGlobal} />
			<ScrollToTopButton />
		</>
	);
}
