import { Link, useOutletContext } from 'react-router-dom';
import useAuth from '../../context/AuthContext/useAuth';
import LoginForm from '../../components/LoginForm/LoginForm';
import FilmCard from '../../components/FilmCard/FilmCard';

import './Profile.scss';
import AddFilm from '../../components/AddFilm/AddFilm';
import { Film } from '@/types/Film';
import { UserType } from '@/types/UserType';

type ProfileContextType = {
	films: Film[];
	removeFromFavorites: (filmId: number, userId: number) => void;
	favoritesIds: number[];
	removeFilm: (user: UserType, filmId: number) => void;
};

export default function Profile() {
	const { user, logout } = useAuth();

	const { films, removeFromFavorites, favoritesIds, removeFilm }: ProfileContextType =
		useOutletContext();

	const notFavoriteFilms = films.filter((film) => !favoritesIds.includes(film.id));
	// eslint-disable-next-line
	const randomFilm = notFavoriteFilms[Math.floor(Math.random() * notFavoriteFilms.length)];

	return user === null ? (
		<section className="cabinet-section">
			<div className="cabinet-container">
				<LoginForm />
			</div>
		</section>
	) : (
		<section className="cabinet-section">
			<div className="cabinet-container">
				<aside className="cabinet-sidebar">
					<div className="cabinet-navigation">
						<button type="button" onClick={logout} className="btn-logout">
							Exit
						</button>
					</div>

					{user.role === 'admin' ? (
						<AddFilm />
					) : (
						<>
							<h2 className="cabinet-title">You might like it</h2>
							{randomFilm && <FilmCard film={randomFilm} />}
						</>
					)}
				</aside>
				<main className="cabinet-main">
					{user.role === 'admin' ? (
						<>
							<h2 className="cabinet-title">Your added movies</h2>
							<div className="favorites-grid">
								{films
									.filter((film) => film.userId === user.id)
									.map((film, index) => {
										return (
											<article key={film.id} className="favorite-card">
												<Link
													to={`/films/film/${film.id}`}
													className="favorite-card__poster">
													<img src={film.poster} alt="Poster" />
												</Link>
												<div className="favorite-card__content">
													<h3 className="favorite-card__title">
														<Link to={`/films/film/${film.id}`}>
															{film.title}
														</Link>
													</h3>
													<p className="favorite-card__genre">
														{film.genre} • {film.rating}
													</p>
													<button
														type="button"
														onClick={() => removeFilm(user, film.id)}
														className="btn-remove">
														Remove film
													</button>
												</div>
											</article>
										);
									})}
							</div>
						</>
					) : (
						<>
							<h2 className="cabinet-title">Favorite films</h2>

							<div className="favorites-grid">
								{films
									.filter((film) => favoritesIds.includes(film.id))
									.map((film, index) => {
										return (
											<article key={film.id} className="favorite-card">
												<Link
													to={`/films/film/${film.id}`}
													className="favorite-card__poster">
													<img src={film.poster} alt="Poster" />
												</Link>
												<div className="favorite-card__content">
													<h3 className="favorite-card__title">
														<Link to={`/films/film/${film.id}`}>
															{film.title}
														</Link>
													</h3>
													<p className="favorite-card__genre">
														{film.genre} • {film.rating}
													</p>
													<button
														type="button"
														onClick={() =>
															removeFromFavorites(film.id, user.id)
														}
														className="btn-remove">
														Remove film
													</button>
												</div>
											</article>
										);
									})}
							</div>
						</>
					)}
				</main>
			</div>
		</section>
	);
}
