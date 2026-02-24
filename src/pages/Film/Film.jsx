import { useParams, useOutletContext } from 'react-router-dom';
import FilmPageSkeleton from './FilmPageSkeleton';

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, Mousewheel } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import './Film.scss';

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
						<img src={film.poster} alt={film.title} width="300" height="450" />
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

					<br />
					<br />
					<br />

					<div className="slider--swiper">
						<Swiper
							modules={[Navigation, Pagination, Scrollbar, Mousewheel]}
							spaceBetween={0}
							slidesPerView={1}
							loop={true}
							scrollbar={{ draggable: true }}
							navigation={{
								prevEl: '.swiper-button-prev',
								nextEl: '.swiper-button-next',
							}}
							pagination={{
								el: '.swiper-pagination',
								clickable: true,
							}}
							mousewheel={{
								enabled: true,
								forceToAxis: true,
								sensitivity: 1,
							}}>
							<SwiperSlide>
								<h3>Movie title:</h3>
								<h2>{film.title}</h2>
							</SwiperSlide>
							<SwiperSlide>
								<h3>Movie genre:</h3>
								<h2>{film.genre}</h2>
							</SwiperSlide>
							<SwiperSlide>
								<h3>Movie description:</h3>
								<p>{film.description}</p>
							</SwiperSlide>
						</Swiper>

						<div className="slide-controls">
							<div className="slider-pagination">
								<div className="swiper-pagination"></div>
							</div>
							<div className="slider-navigation">
								<div className="swiper-button-prev"></div>
								<div className="swiper-button-next"></div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
