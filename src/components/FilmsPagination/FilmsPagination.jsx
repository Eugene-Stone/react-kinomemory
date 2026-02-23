import './FilmsPagination.scss';

export default function FilmsPagination({ currentPage, totalPages, setCurrentPage }) {
	return (
		<div className="pagination-box">
			<ul className="pagination">
				<li className="active">
					<button className="pagination__prev">Prev</button>
				</li>

				{[...Array(totalPages)].map((_, index) => (
					<li key={index + 1} className={currentPage === index + 1 ? 'active' : ''}>
						<button
							className="navigation__link"
							onClick={() => setCurrentPage(index + 1)}>
							{index + 1}
						</button>
					</li>
				))}

				<li className="active">
					<button className="pagination__next">Next</button>
				</li>
			</ul>
		</div>
	);
}
