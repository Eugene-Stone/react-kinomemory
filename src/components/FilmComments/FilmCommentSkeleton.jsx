import ContentLoader from 'react-content-loader';

export default function FilmCommentSkeleton(props) {
	return (
		<div className="review-skeleton">
			<ContentLoader
				speed={2}
				width="100%"
				height={140}
				viewBox="0 0 800 140"
				backgroundColor="#2f3640"
				foregroundColor="#3d4754"
				{...props}>
				<rect x="0" y="0" rx="6" ry="6" width="220" height="28" />
				<rect x="620" y="4" rx="6" ry="6" width="150" height="20" />
				<rect x="0" y="45" rx="2" ry="2" width="800" height="2" />
				<rect x="0" y="65" rx="6" ry="6" width="760" height="18" />
				<rect x="0" y="90" rx="6" ry="6" width="700" height="18" />
			</ContentLoader>
		</div>
	);
}
