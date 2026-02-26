import { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { useThemeContext } from '../../context/ThemeContext/useThemeContext';
import { useDebounce } from '../../hooks/useDebounce.js';
import './Header.scss';

export default function Header({ searchQuery, setSearchQuery, films }) {
	const navigate = useNavigate();
	const location = useLocation();
	const { isDark, setIsDark } = useThemeContext();
	const [searchValue, setSearchValue] = useState('');
	const searchQueryDebounce = useDebounce(searchValue, 500);
	const [isFocused, setIsFocused] = useState(false);

	// const inputRef = useRef(null);

	// useEffect(() => {
	// 	if (!isFocused) {
	// 		return;
	// 	}

	// 	function handleKeyDown(e) {
	// 		if (e.key === 'Escape') {
	// 			if (inputRef.current) {
	// 				// setIsFocused(false);
	// 				inputRef.current.blur();
	// 			}
	// 		}
	// 	}

	// 	window.addEventListener('keydown', handleKeyDown);

	// 	return () => {
	// 		window.removeEventListener('keydown', handleKeyDown);
	// 	};
	// }, [isFocused]);

	let filmsSearchList = films
		.filter((film) => film.title.toLowerCase().includes(searchQueryDebounce.toLowerCase()))

		.map((film) => (
			<li key={film.id}>
				<Link to={`/films/film/${film.id}`}>
					<span>{film.title}</span>
					<span>{film.rating}</span>
				</Link>
			</li>
		));

	// console.log(searchList);

	function handleSearchChange(value) {
		setSearchQuery(value);

		// If not films page
		if (location.pathname !== '/') {
			navigate('/');
		}
	}

	function handleSearchClear() {
		// filmsSearchList = [];
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

				<ul className="menu">
					<li>
						<NavLink to={'/privacy'}>Privacy</NavLink>
					</li>
					<li>
						<NavLink to={'/123'}>404 page</NavLink>
					</li>
				</ul>
			</nav>

			<form
				className="header__search"
				onSubmit={(e) => (e.preventDefault(), handleSearchChange(searchValue))}>
				<input
					// ref={inputRef}
					onKeyDown={(e) => {
						if (e.key === 'Escape') {
							setSearchValue('');
							e.currentTarget.blur();
						}
					}}
					value={searchValue}
					type="text"
					className="header__search-input"
					placeholder="Search film..."
					// onChange={(e) => setSearchQuery(e.target.value)}
					onChange={(e) => setSearchValue(e.target.value)}
					onFocus={() => setIsFocused(true)}
					onBlur={() =>
						setTimeout(() => {
							setIsFocused(false);
						}, 300)
					}
				/>
				{searchQueryDebounce !== '' ? (
					<button
						type="button"
						className="header__search-btn-clear"
						onClick={(e) => (e.preventDefault(), handleSearchClear())}>
						X
					</button>
				) : (
					''
				)}
				<button type="submit" className="header__search-btn"></button>

				{isFocused && searchQueryDebounce !== '' ? (
					<ul className="header__search-list">{filmsSearchList}</ul>
				) : (
					''
				)}
			</form>

			<button className="change-theme-btn" onClick={() => setIsDark(!isDark)}>
				{isDark ? '🌚' : '🌞'}
			</button>
		</div>
	);
}
