import { Film } from './Film';

type FilmPreviewModal = {
	type: 'FILM_PREVIEW';
	payload: Film;
};

type LoginModal = {
	type: 'LOGIN';
};

export type ModalContentType = FilmPreviewModal | LoginModal;
