import { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useThemeContext } from '../../context/ThemeContext/useThemeContext';
import './Header.scss';

export default function Header({ searchQuery, setSearchQuery }) {
	const navigate = useNavigate();
	const location = useLocation();
	const { isDark, setIsDark } = useThemeContext();
	const [searchValue, setSearchValue] = useState('');

	function handleSearchChange(value) {
		// const value = e.target.value;
		// setSearchValue('');
		setSearchQuery(value);

		// If not films page
		if (location.pathname !== '/') {
			navigate('/');
		}
	}

	function handleSearchClear() {
		setSearchValue('');
		setSearchQuery('');
	}
	// console.log(isDark);

	return (
		<div className="header">
			<nav>
				<div className="logo">
					<NavLink to={'/'}>
						<span>KinoMemory</span>
					</NavLink>
				</div>

				<ul>
					<li>
						<NavLink to={'/privacy'}>Privacy</NavLink>
					</li>
					<li>
						<NavLink to={'/123'}>404 page</NavLink>
					</li>
				</ul>
			</nav>

			<form className="header__search">
				<input
					value={searchValue}
					type="text"
					className="header__search-input"
					placeholder="Search film..."
					// onChange={(e) => setSearchQuery(e.target.value)}
					onChange={(e) => setSearchValue(e.target.value)}
				/>
				{searchQuery !== '' ? (
					<button
						className="header__search-btn-clear"
						onClick={(e) => (e.preventDefault(), handleSearchClear())}>
						X
					</button>
				) : (
					''
				)}
				<button
					className="header__search-btn"
					onClick={(e) => (e.preventDefault(), handleSearchChange(searchValue))}></button>
			</form>

			<button className="change-theme-btn" onClick={() => setIsDark(!isDark)}>
				{isDark ? '🌚' : '🌞'}
			</button>
		</div>
	);
}
