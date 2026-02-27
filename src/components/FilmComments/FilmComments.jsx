import { lazy, Suspense } from 'react';
// import FilmComment from './FilmComment';
import FilmCommentSkeleton from './FilmCommentSkeleton';
const LazyFilmComment = lazy(() => import('./FilmComment'));

export default function FilmComments({ film }) {
	const commentsList = film.comments.map((comment) => (
		<Suspense key={comment.userId} fallback={<FilmCommentSkeleton />}>
			<LazyFilmComment comment={comment} />
		</Suspense>
	));

	return <ul className="comments">{commentsList}</ul>;
}
