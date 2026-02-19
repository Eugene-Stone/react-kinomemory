import { Link } from 'react-router-dom';

export default function NotFoundPage() {
	return (
		<section className="page-404" style={{ textAlign: 'center' }}>
			<h1>Page not found</h1>
			<div className="button__box">
				<Link to={'/'}>
					<button>Go back home</button>
				</Link>
			</div>
		</section>
	);
}
