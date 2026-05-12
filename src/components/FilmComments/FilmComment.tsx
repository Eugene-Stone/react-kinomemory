import { FilmCommentType } from '../../types/FilmCommentType.ts';

type FilmCommentProps = {
	comment: FilmCommentType;
};

export default function FilmComment({ comment }: FilmCommentProps) {
	return (
		<li key={comment.userId}>
			<div className="user">{comment.userName}</div>
			<div className="date">{comment.date}</div>
			<div className="text">{comment.text}</div>
		</li>
	);
}
