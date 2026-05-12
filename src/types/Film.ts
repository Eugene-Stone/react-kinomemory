import { FilmCommentType } from './FilmCommentType';

export type Film = {
	id: number;
	title: string;
	rating: number;
	genre: string;
	poster: string;
	trailer: string;
	description: string;
	comments?: FilmCommentType[];
	userId?: number;
};

export type AddFilmForm = Omit<Film, 'id' | 'comments' | 'userId'>;
