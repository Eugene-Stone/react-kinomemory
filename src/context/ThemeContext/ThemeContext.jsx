import { createContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
	const [isDark, setIsDark] = useState(() => {
		const stored = localStorage.getItem('isDark');

		return stored ? JSON.parse(stored) : true;
	});

	useEffect(() => {
		localStorage.setItem('isDark', isDark);
		const themeClass = isDark ? 'dark' : 'light';
		document.body.classList.remove('light', 'dark');
		document.body.classList.add(themeClass);
	}, [isDark]);

	return <ThemeContext.Provider value={{ isDark, setIsDark }}>{children}</ThemeContext.Provider>;
}

export { ThemeContext };
