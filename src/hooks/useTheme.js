import { useState, useEffect } from "react";

export function useTheme() {
	const [isDark, setIsDark] = useState(() => {
		const stored = localStorage.getItem('isDark')
		
		return stored ? JSON.parse(stored) : true;
	});


	useEffect(() => {
		localStorage.setItem("isDark", isDark);	
		const themeClass = isDark ? 'dark' : 'light';
		document.body.classList.remove('light', 'dark');
		document.body.classList.add(themeClass);
	}, [isDark]);


	return {
		isDark,
		setIsDark,
	};
}
