import { useEffect, useState, useCallback, useRef } from 'react';

export default function useDoubleTap(callback) {
	/* Callback ref pattern; give to consumer of hook so they can set the
	ref  */
	const [elem, setElem] = useState(null);
	const callbackRef = useCallback((node) => {
		setElem(node);
		callbackRef.current = node;
	}, []);
	const countRef = useRef(0);
	const timerRef = useRef(null);
	const inputCallbackRef = useRef(null);
	useEffect(() => {
		inputCallbackRef.current = callback;
	});

	useEffect(() => {
		function handler() {
			const isDoubleClick = countRef.current + 1 === 2;
			const timerIsPresent = timerRef.current;
			if (timerIsPresent && isDoubleClick) {
				// Double tap happened reset timer and click count
				clearTimeout(timerRef.current);
				timerRef.current = null;
				countRef.current = 0;
				if (inputCallbackRef.current) {
					console.log('Double tap occured calling passed in callback');
					inputCallbackRef.current();
				}
			}
			if (!timerIsPresent) {
				// Just starting a new cycle of detecting double tap
				countRef.current = countRef.current + 1;
				// If another click is not detected in 350ms it will
				// reset the timer and click count.
				const timer = setTimeout(() => {
					clearTimeout(timerRef.current);
					timerRef.current = null;
					countRef.current = 0;
				}, 350);
				timerRef.current = timer;
			}
		}

		if (elem) {
			elem.addEventListener('click', handler);
		}
		return () => {
			if (elem) {
				elem.removeEventListener('click', handler);
			}
		};
	}, [elem]);

	return [callbackRef, elem];
}
