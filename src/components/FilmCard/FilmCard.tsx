import { memo } from 'react';

import { Link } from 'react-router-dom';
import { useModalContext } from '@/context/ModalContext/useModalContext';
import './FilmCard.scss';
import useAuth from '../../context/AuthContext/useAuth';
import { Film } from '@/types/Film';
import { UserType } from '@/types/UserType';

type FilmCardType = {
	film: Film;
	isFavorite?: boolean;
	handleFavorite?: (filmId: number, userId: number) => void;
	loading?: boolean;
};

const FilmCard = memo(function FilmCard({
	film,
	isFavorite,
	handleFavorite,
	loading,
}: FilmCardType) {
	const { user } = useAuth();

	const modal = useModalContext();
	// Или напрямую
	// const { open } = useModalContext();
	// console.log(modal);

	const getModalContent = (film: Film) => (
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

	return (
		<li className="film__card" key={film.title}>
			<Link to={`/films/film/${film.id}`} className="image__link">
				<img src={film.poster} alt={film.title} width="300" height="450" />
			</Link>

			{user !== null &&
				(isFavorite ? (
					<button
						className="btn btn--remove-favorite"
						onClick={() => handleFavorite?.(film.id, user.id)}>
						Remove Favorite
					</button>
				) : (
					<button
						className="btn btn--add-favorite"
						onClick={() => handleFavorite?.(film.id, user.id)}>
						Add Favorite
					</button>
				))}

			{/* <button onClick={() => modal.open(getModalContent(film))}>Open Brief</button> */}
			<button
				onClick={() =>
					modal.open({
						type: 'FILM_PREVIEW',
						payload: film,
					})
				}>
				Open Brief with type
			</button>

			<div className="rate">{film.rating}</div>
			<div className="title">
				<Link to={`/films/film${film.id}`}>{film.title}</Link>
			</div>
		</li>
	);
});

export default FilmCard;
