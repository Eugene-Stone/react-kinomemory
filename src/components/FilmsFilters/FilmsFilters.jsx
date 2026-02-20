import './FilmsFilters.scss';

export default function FilmsFilters({
	onlyFavorites,
	setOnlyFavorites,
	ratingOverNine,
	setRatingOverNine,
	genre,
	setGenre,
	genreList,
}) {
	return (
		<div className="films__filter-box">
			<ul className="films__filter">
				<li className="films__filter-item">
					<button
						className={`btn films__filter-btn ${onlyFavorites && 'active'}`}
						onClick={() => setOnlyFavorites((prev) => !prev)}>
						Only favorites
					</button>
				</li>
				<li>
					<button
						className={`btn films__filter-btn ${ratingOverNine && 'active'}`}
						onClick={() => setRatingOverNine((prev) => !prev)}>
						Rating over 9
					</button>
				</li>
			</ul>

			<div className="select">
				<span>Genre:</span>
				<select name="#genre" value={genre} onChange={(e) => setGenre(e.target.value)}>
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
