import { useParams, useOutletContext } from 'react-router-dom';
import './Film.scss';
import FilmPageSkeleton from './FilmPageSkeleton';

export default function Film() {
	const { id } = useParams();
	const { films, favoritesIds, addToFavorites, removeFromFavorites } = useOutletContext();
	const isFavorite = favoritesIds.includes(id);

	const film = films.find((f) => Number(f.id) === Number(id));

	if (!film) {
		return <FilmPageSkeleton />;
	}

	// console.log(film.title);

	return (
		<>
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
					{isFavorite ? (
						<>
							<span className="heart">❤️</span>
							<button
								className="btn btn--remove-favorite"
								onClick={() => removeFromFavorites(id)}>
								Remove from Favorite
							</button>
						</>
					) : (
						<>
							<span className="heart">🤍</span>
							<button
								className="btn btn--add-favorite"
								onClick={() => addToFavorites(id)}>
								Add to Favorite
							</button>
						</>
					)}

					<h1 className="title">{film.title}</h1>
					<div className="rating">{film.rating}</div>
					<div className="genre">{film.genre}</div>
					<div className="description">{film.description}</div>
				</div>
			</section>
		</>
	);
}
