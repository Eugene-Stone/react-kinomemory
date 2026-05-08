import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/router';

import ScrollToTopButton from '@/components/ScrollToTop/ScrollToTop';
import { AuthProvider } from '@/context/AuthContext/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext/ThemeContext';
import { ModalProvider } from '@/context/ModalContext/ModalContext';
import '@/styles/index.scss';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<AuthProvider>
			<ThemeProvider>
				<ModalProvider>
					<RouterProvider router={router} />
					<ScrollToTopButton />
				</ModalProvider>
			</ThemeProvider>
		</AuthProvider>
	</StrictMode>,
);
