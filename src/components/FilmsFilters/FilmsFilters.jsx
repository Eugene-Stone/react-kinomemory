import './FilmsFilters.scss';
import useAuth from '../../context/AuthContext/useAuth';

export default function FilmsFilters({
	onlyFavorites,
	setOnlyFavorites,
	ratingOverNine,
	setRatingOverNine,
	genre,
	setGenre,
	genreList,
	setCurrentPage,
	filtersReset,
	hasActiveFilters,
}) {
	const { user } = useAuth();

	return (
		<div className="films__filter-box">
			<ul className="films__filter">
				{user !== null && (
					<li className="films__filter-item">
						<button
							className={`btn films__filter-btn ${onlyFavorites && 'active'}`}
							onClick={() => (setOnlyFavorites((prev) => !prev), setCurrentPage(1))}>
							Only favorites
						</button>
					</li>
				)}

				<li>
					<button
						className={`btn films__filter-btn ${ratingOverNine && 'active'}`}
						onClick={() => (setRatingOverNine((prev) => !prev), setCurrentPage(1))}>
						Rating over 9
					</button>
				</li>

				{hasActiveFilters && (
					<li>
						<button className={`btn films__filter-reset`} onClick={filtersReset}>
							Filters reset
						</button>
					</li>
				)}
			</ul>

			<div className="select">
				<span>Genre:</span>
				<select
					name="#genre"
					value={genre}
					onChange={(e) => (setGenre(e.target.value), setCurrentPage(1))}>
					<option value="All genre">All genre</option>

					{genreList.map((genreItem) => (
						<option key={genreItem} value={genreItem}>
							{genreItem}
						</option>
					))}
				</select>
			</div>
		</div>
	);
}
