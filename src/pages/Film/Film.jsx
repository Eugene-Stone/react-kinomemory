import { useParams, useOutletContext } from 'react-router-dom';
import './Film.scss';

export default function Film() {
	const { id } = useParams();
	const { films } = useOutletContext();
	// console.log(films);

	// const film = films.filter((f) => +f.id === id);
	const film = films.find((f) => Number(f.id) === Number(id));

	if (!film) {
		return <h1>Loading...</h1>;
	}

	console.log(film.title);

	return (
		<section className="film__page">
			<div className="film__media">
				<div className="poster">
					<img src={film.poster} alt={film.title} />
				</div>
				<div className="trailer">
					<a href={film.trailer} target="_blank">
						Watch trailer
					</a>
				</div>
			</div>

			<div className="film__content">
				<h1 className="title">{film.title}</h1>
				<div className="rating">{film.rating}</div>
				<div className="genre">{film.genre}</div>
				<div className="description">{film.description}</div>
			</div>
		</section>
	);
}
