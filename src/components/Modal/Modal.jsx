import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useModalContext } from '../../context/ModalContext/useModalContext.js';
import './Modal.scss';

export default function Modal() {
	// const modal = useModalContext();
	const { isOpen, close, content } = useModalContext();

	useEffect(() => {
		if (!isOpen) return;

		function handleKeyDown(e) {
			if (e.key === 'Escape') {
				close();
			}
		}

		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [isOpen, close]);

	if (!isOpen) return null;

	const modalRoot = document.getElementById('modal-root');

	// let ModalTypeContent = null;

	// switch (content.type) {
	// 	case 'FILM_PREVIEW':
	// 		ModalTypeContent = <FilmPreview film={content.payload} />;
	// 		break;

	// 	case 'CONFIRM_DELETE':
	// 		ModalTypeContent = <ConfirmDelete {...content.payload} />;
	// 		break;

	// 	case 'LOGIN':
	// 		ModalTypeContent = <LoginForm />;
	// 		break;

	// 	default:
	// 		ModalTypeContent = null;
	// }

	return createPortal(
		<div className="overlay" onClick={close}>
			<div className="modal" onClick={(e) => e.stopPropagation()}>
				<button onClick={close}>X</button>
				{content}
			</div>
		</div>,
		modalRoot,
	);
}
