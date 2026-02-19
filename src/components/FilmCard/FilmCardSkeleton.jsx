import ContentLoader from 'react-content-loader';

const FilmCardSkeleton = (props) => (
	<ContentLoader
		className="film-card-skeleton"
		speed={2}
		width={100}
		height={208}
		viewBox="0 0 100 208"
		backgroundColor="#797171"
		foregroundColor="#48a1d5"
		{...props}>
		<rect x="0" y="0" rx="5" ry="5" width="100" height="150" />
		<rect x="20" y="195" rx="2" ry="2" width="60" height="7" />
		<rect x="5" y="155" rx="3" ry="3" width="90" height="14" />
		<rect x="5" y="172" rx="3" ry="3" width="90" height="14" />
	</ContentLoader>
);

export default FilmCardSkeleton;
