import { lazy, Suspense } from 'react';
import { Film } from '../../types/Film.ts';
import { FilmCommentType } from '../../types/FilmCommentType.ts';
import FilmCommentSkeleton from './FilmCommentSkeleton';
const LazyFilmComment = lazy(() => import('./FilmComment'));

import './FilmComments.scss';

type FilmProps = {
	film: Film;
};

export default function FilmComments({ film }: FilmProps) {
	if (!film.comments) {
		return <div>Comments not yet</div>;
	}

	return (
		<Suspense fallback={<FilmCommentSkeleton />}>
			<ul className="comments">
				{film.comments.map((comment) => (
					<LazyFilmComment key={comment.userId} comment={comment} />
				))}
			</ul>
		</Suspense>
	);
}
