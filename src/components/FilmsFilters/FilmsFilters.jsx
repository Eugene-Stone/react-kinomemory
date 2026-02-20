import './FilmsFilters.scss';

export default function FilmsFilters() {
	return (
		<div className="films__filter-box">
			<ul className="films__filter">
				<li className="films__filter-item">
					<button className="btn films__filter-btn">In favorites</button>
				</li>
				<li className="films__filter-item">
					<button className="btn films__filter-btn active">Rating over 9</button>
				</li>
			</ul>

			<div className="sorting">
				<span>Genre:</span>
				<select name="#genre">
					<option value="All genre">All genre</option>
					<option value="Drama">Drama</option>
					<option value="Crime">Crime</option>
					<option value="Thriller">Thriller</option>
				</select>
			</div>
		</div>
	);
}
