import ContentLoader from 'react-content-loader';

export default function FilmPageSkeleton(props) {
	return (
		<section className="film__page film__page--skeleton">
			<ContentLoader
				speed={2}
				width="100%"
				height={520}
				viewBox="0 0 1000 520"
				style={{ maxWidth: 1000 }}
				backgroundColor="#2f3640"
				foregroundColor="#3d4754"
				{...props}>
				<rect x="0" y="0" rx="20" ry="20" width="300" height="420" />
				<rect x="0" y="440" rx="14" ry="14" width="300" height="60" />

				<rect x="350" y="0" rx="10" ry="10" width="200" height="40" />

				<rect x="350" y="70" rx="8" ry="8" width="550" height="60" />

				<rect x="350" y="150" rx="10" ry="10" width="70" height="40" />
				<rect x="350" y="210" rx="6" ry="6" width="140" height="20" />

				<rect x="350" y="260" rx="6" ry="6" width="600" height="20" />
				<rect x="350" y="290" rx="6" ry="6" width="580" height="20" />
				<rect x="350" y="320" rx="6" ry="6" width="520" height="20" />
			</ContentLoader>
		</section>
	);
}
