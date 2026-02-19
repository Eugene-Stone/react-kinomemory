import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useGlobalModal } from './components/GlobalModal/useGlobalModal';

import Header from './components/Header/Header';
import GlobalModal from './components/GlobalModal/GlobalModal';

export default function Layout() {
	const modalGlobal = useGlobalModal();

	useEffect(() => {
		console.log('Layout mounted');
	}, []);

	return (
		<>
			<Header />
			<Outlet context={{ modalGlobal }} />

			<GlobalModal modal={modalGlobal} />
		</>
	);
}
