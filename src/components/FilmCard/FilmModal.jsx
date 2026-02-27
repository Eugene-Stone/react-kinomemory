// import React from 'react';

export default function FilmModal({ film }) {
	return (
		<>
			<p className="rate">{film.rating}</p>
			<p className="genree">{film.genre}</p>
			<h2 className="title">{film?.title}</h2>
			<img src={film?.poster} alt={film?.title} />
			<a href={film?.trailer} target="_blank">
				Watch trailer
			</a>
		</>
	);
}
