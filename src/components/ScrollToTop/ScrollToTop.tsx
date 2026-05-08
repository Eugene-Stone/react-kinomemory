import { useState, useEffect } from 'react';
import './ScrollToTopButton.scss'; // Optional: for styling

const ScrollToTopButton = () => {
	const [isVisible, setIsVisible] = useState(false);

	// Show button when page is scrolled down
	const toggleVisibility = () => {
		if (window.pageYOffset > 300) {
			// Show button after scrolling 300px
			setIsVisible(true);
		} else {
			setIsVisible(false);
		}
	};

	// Scroll to the top of the page smoothly
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth', // Smooth scrolling behavior
		});
	};

	useEffect(() => {
		window.addEventListener('scroll', toggleVisibility);

		// Clean up the event listener when the component unmounts
		return () => {
			window.removeEventListener('scroll', toggleVisibility);
		};
	}, []);

	return (
		<div className="scroll-to-top">
			{isVisible && (
				<button onClick={scrollToTop} className="scroll-to-top-button">
					Top
				</button>
			)}
		</div>
	);
};

export default ScrollToTopButton;
