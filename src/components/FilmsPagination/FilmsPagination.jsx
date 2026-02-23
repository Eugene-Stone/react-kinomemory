import './FilmsPagination.scss';

export default function FilmsPagination({ currentPage, totalPages, setCurrentPage }) {
	function handlePrev() {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	}

	function handleNext() {
		if (currentPage !== totalPages) {
			setCurrentPage(currentPage + 1);
		}
	}

	function getPagination(currentPage, totalPages) {
		const pages = [];

		const delta = 1; // сколько страниц вокруг текущей

		const rangeStart = Math.max(2, currentPage - delta);
		const rangeEnd = Math.min(totalPages - 1, currentPage + delta);

		pages.push(1);

		if (rangeStart > 2) {
			pages.push('...');
		}

		for (let i = rangeStart; i <= rangeEnd; i++) {
			pages.push(i);
		}

		if (rangeEnd < totalPages - 1) {
			pages.push('...');
		}

		if (totalPages > 1) {
			pages.push(totalPages);
		}

		return pages;
	}

	return (
		<div className="pagination-box">
			<ul className="pagination">
				<li>
					<button
						className={
							currentPage > 1 ? 'pagination__prev' : 'pagination__prev disabled'
						}
						onClick={handlePrev}>
						Prev
					</button>
				</li>

				{/* {[...Array(totalPages)].map((_, index) => (
					<li key={index + 1} className={currentPage === index + 1 ? 'active' : ''}>
						<button
							className="navigation__link"
							onClick={() => setCurrentPage(index + 1)}>
							{index + 1}
						</button>
					</li>
				))} */}

				{getPagination(currentPage, totalPages).map((page, index) => (
					<li key={index} className={currentPage === page ? 'active' : ''}>
						{page === '...' ? (
							<span>...</span>
						) : (
							<button
								className="navigation__link"
								onClick={() => setCurrentPage(page)}>
								{page}
							</button>
						)}
					</li>
				))}

				<li>
					<button
						className={
							currentPage !== totalPages
								? 'pagination__next'
								: 'pagination__next disabled'
						}
						onClick={handleNext}>
						Next
					</button>
				</li>
			</ul>
		</div>
	);
}
