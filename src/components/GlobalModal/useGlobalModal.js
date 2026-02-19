import { useState, useEffect } from "react";

export function useGlobalModal() {
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

	return { isOpen, open, close, content };
}