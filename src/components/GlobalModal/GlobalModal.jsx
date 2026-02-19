import { createPortal, useEffect } from 'react-dom';

import './GlobalModal.scss';

export default function GlobalModal({ modal }) {
	if (!modal.isOpen) return null;

	const modalRoot = document.getElementById('globalmodal-root');

	return createPortal(
		<div className="overlay" onClick={modal.close}>
			<div className="modal" onClick={(e) => e.stopPropagation()}>
				<button onClick={modal.close}>X</button>
				{modal.content}
			</div>
		</div>,
		modalRoot,
	);
}
