import { useOutletContext, Link } from 'react-router-dom';
import './FilmCard.scss';

export default function FilmCard({ film, isFavorite, handleFavorite }) {
	const { modalGlobal } = useOutletContext();

	const getModalContent = (film) => (
		<>
			<p className="rate">{film.rating}</p>
			<p className="tgenree">{film.genre}</p>
			<h2 className="title">{film?.title}</h2>
			<img src={film?.poster} alt={film?.title} />
			<a href={film?.trailer} target="_blank">
				Watch trailer
			</a>
		</>
	);

	return (
		<li className="film__card" key={film.title}>
			<Link to={`/films/film${film.id}`} className="image__link">
				<img src={film.poster} alt={film.title} />
			</Link>

			{/* <button onClick={() => handleFavorite(film.id)}>Add Favorite</button> */}

			{isFavorite ? (
				<button
					className="btn btn--remove-favorite"
					onClick={() => handleFavorite(film.id)}>
					Remove Favorite
				</button>
			) : (
				<button className="btn btn--add-favorite" onClick={() => handleFavorite(film.id)}>
					Add Favorite
				</button>
			)}

			<button onClick={() => modalGlobal.open(getModalContent(film))}>Open Modal</button>
			<div className="rate">{film.rating}</div>
			<div className="title">{film.title}</div>
		</li>
	);
}
