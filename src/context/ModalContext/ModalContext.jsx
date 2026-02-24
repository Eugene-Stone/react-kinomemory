import { createContext, useState, useEffect } from 'react';

const ModalContext = createContext(null);

export function ModalProvider({ children }) {
	const [isOpen, setIsOpen] = useState(false);
	const [content, setContent] = useState(null);

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		}

		return () => {
			document.body.style.overflow = '';
		};
	}, [isOpen]);

	function open(data) {
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
