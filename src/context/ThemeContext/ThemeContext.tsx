import { createContext, useState, useEffect } from 'react';

type ThemeContextType = {
	isDark: boolean;
	setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
};
const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: React.PropsWithChildren) {
	const [isDark, setIsDark] = useState<boolean>(() => {
		const stored = localStorage.getItem('isDark');

		return stored ? JSON.parse(stored) : true;
	});

	useEffect(() => {
		localStorage.setItem('isDark', JSON.stringify(isDark));
		const themeClass = isDark ? 'dark' : 'light';
		document.body.classList.remove('light', 'dark');
		document.body.classList.add(themeClass);
	}, [isDark]);

	return <ThemeContext.Provider value={{ isDark, setIsDark }}>{children}</ThemeContext.Provider>;
}

export { ThemeContext };
