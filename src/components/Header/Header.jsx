// import { useDebounceValue } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';

export default function Header({ searchQuery, setSearchQuery }) {
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
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
				<button
					className="header__search-btn"
					onClick={(e) => (e.preventDefault(), setSearchQuery(searchQuery))}></button>
			</form>
		</div>
	);
}
