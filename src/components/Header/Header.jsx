import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useThemeContext } from '../../context/ThemeContext/useThemeContext';
import './Header.scss';

export default function Header({ searchQuery, setSearchQuery }) {
	const navigate = useNavigate();
	const location = useLocation();
	const { isDark, setIsDark } = useThemeContext();

	function handleSearchChange(value) {
		// const value = e.target.value;
		setSearchQuery(value);

		// If not films page
		if (location.pathname !== '/') {
			navigate('/');
		}
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
					value={searchQuery}
					type="text"
					className="header__search-input"
					placeholder="Search film..."
					// onChange={(e) => setSearchQuery(e.target.value)}
					onChange={(e) => handleSearchChange(e.target.value)}
				/>
				<button
					className="header__search-btn"
					onClick={(e) => (e.preventDefault(), handleSearchChange(searchQuery))}></button>
			</form>

			<button className="change-theme-btn" onClick={() => setIsDark(!isDark)}>
				{isDark ? '🌚' : '🌞'}
			</button>
		</div>
	);
}
