import { useEffect } from 'react';

/**
 * Hook that alerts clicks outside of the passed ref
 */
export default function useOutsideClick(ref, dismissFunction) {
	useEffect(() => {
		/**
		 * Alert if clicked on outside of element
		 */
		function handleClickOutside(event) {
			if (ref.current && !ref.current.contains(event.target)) {
				dismissFunction();
			}
		}

		// Bind the event listener
		document.addEventListener('click', handleClickOutside);
		return () => {
			console.log('UNBINING EVENT ON OUTSIDE CLICK');
			// Unbind the event listener on clean up
			document.removeEventListener('click', handleClickOutside);
		};
	}, [ref, dismissFunction]);
}
