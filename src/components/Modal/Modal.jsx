import { createPortal } from 'react-dom';
import { useModalContext } from '../../context/ModalContext/useModalContext.js';
import './Modal.scss';

export default function Modal() {
	const modal = useModalContext();

	if (!modal.isOpen) return null;

	const modalRoot = document.getElementById('modal-root');

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
