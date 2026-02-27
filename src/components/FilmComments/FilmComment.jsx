export default function FilmComment({ comment }) {
	return (
		<li>
			<div className="user">{comment.userName}</div>
			<div className="date">{comment.date}</div>
			<div className="text">{comment.text}</div>
		</li>
	);
}
