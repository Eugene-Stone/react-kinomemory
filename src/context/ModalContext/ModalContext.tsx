import { createContext, useState, useEffect } from 'react';
import { ModalContentType } from '../../types/Modal.ts';

type ModalContextType = {
	open: (data: ModalContentType) => void;
	close: () => void;
	isOpen: boolean;
	content: ModalContentType | null;
};

const ModalContext = createContext<ModalContextType | null>(null);

export function ModalProvider({ children }: React.PropsWithChildren) {
	const [isOpen, setIsOpen] = useState(false);
	const [content, setContent] = useState<ModalContentType | null>(null);

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		}

		return () => {
			document.body.style.overflow = '';
		};
	}, [isOpen]);

	function open(data: ModalContentType) {
		setContent(data);
		setIsOpen(true);
	}
	function close() {
		setIsOpen(false);
		setContent(null);
	}

	return (
		<ModalContext.Provider value={{ isOpen, open, close, content }}>
			{children}
		</ModalContext.Provider>
	);
}

export { ModalContext };
