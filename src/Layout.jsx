import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { useGlobalModal } from './components/GlobalModal/useGlobalModal';
import { useMovies } from './hooks/useMovies';

import Header from './components/Header/Header';
import GlobalModal from './components/GlobalModal/GlobalModal';

export default function Layout() {
	const modalGlobal = useGlobalModal();
	const [searchQuery, setSearchQuery] = useState('');
	const moviesData = useMovies();

	// useEffect(() => {
	// 	console.log('Layout mounted');
	// }, []);

	return (
		<>
			<Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
			<Outlet context={{ modalGlobal, searchQuery, ...moviesData }} />

			<GlobalModal modal={modalGlobal} />
		</>
	);
}
