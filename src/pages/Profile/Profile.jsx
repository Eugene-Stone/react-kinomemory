import { useOutletContext } from 'react-router-dom';
import useAuth from '../../context/AuthContext/useAuth';
import LoginForm from '../../components/LoginForm/LoginForm';
import { Link } from 'react-router-dom';
import FilmCard from '../../components/FilmCard/FilmCard';
import FilmCardSkeleton from '../../components/FilmCard/FilmCardSkeleton';
import './Profile.scss';

export default function Profile() {
	const { user, logout } = useAuth();

	const { films, removeFromFavorites, favoritesIds } = useOutletContext();

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
						<div className="admin-tools">
							<h2 className="cabinet-subtitle">Добавить новый фильм</h2>
							<form className="add-movie-form">
								<div className="form-group">
									<input type="text" placeholder="Title" required="" />
								</div>
								<div className="form-group">
									<input
										type="number"
										step="0.1"
										placeholder="Rating"
										required=""
									/>
								</div>
								<div className="form-group">
									<input type="text" placeholder="Genre" required="" />
								</div>
								<div className="form-group">
									<input type="url" placeholder="Poster URL" required="" />
								</div>
								<div className="form-group">
									<input type="url" placeholder="Trailer URL" required="" />
								</div>
								<div className="form-group">
									<textarea
										placeholder="Description"
										required=""
										defaultValue={''}
									/>
								</div>
								<button type="submit" className="btn-submit">
									Опубликовать
								</button>
							</form>
						</div>
					) : (
						<>
							<h2 className="cabinet-subtitle">You might like it</h2>

							{/* <FilmCard /> */}
							<FilmCardSkeleton />
						</>
					)}
				</aside>
				<main className="cabinet-main">
					{user.role === 'admin' ? (
						<>
							<h2 className="cabinet-title">Added movies</h2>
							<div className="favorites-grid">
								<article className="favorite-card">
									<div className="favorite-card__poster">
										<img
											src="https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg"
											alt="Poster"
										/>
									</div>
									<div className="favorite-card__content">
										<h3 className="favorite-card__title">
											The Shawshank Redemption
										</h3>
										<p className="favorite-card__genre">Drama • 9.3</p>
										<button className="btn-remove">Удалить из списка</button>
									</div>
								</article>
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
