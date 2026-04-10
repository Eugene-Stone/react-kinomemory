import { createContext, useState, useEffect, useEffectEvent } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);

	const changeUser = useEffectEvent((user) => {
		setUser(user);
	});

	useEffect(() => {
		const savedUser = localStorage.getItem('user');

		if (savedUser) {
			changeUser(JSON.parse(savedUser));
		}
	}, []);

	const login = async (login, password) => {
		const res = await fetch(`http://localhost:3001/users?login=${login}&password=${password}`);
		const data = await res.json();

		if (data.length) {
			setUser(data[0]);
			localStorage.setItem('user', JSON.stringify(data[0]));

			return true;
		}

		return false;
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem('user');
	};

	return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export { AuthContext };
