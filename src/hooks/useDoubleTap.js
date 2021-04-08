import { useEffect } from 'react';

export default function useDoubleTap(elementRef, onDoubleClick) {
	useEffect(() => {
		function detectDoubleTapClosure() {
			let lastTap = 0;
			let timeout;
			return function detectDoubleTap(event) {
				const curTime = new Date().getTime();
				const tapLen = curTime - lastTap;
				if (tapLen < 500 && tapLen > 0) {
					console.log('Double tapped!');
					onDoubleClick();
					event.preventDefault();
				} else {
					timeout = setTimeout(() => {
						clearTimeout(timeout);
					}, 500);
				}
				lastTap = curTime;
			};
		}
		// To be able to clean up without losing reference
		const ref = elementRef.current;
		ref.addEventListener('click', detectDoubleTapClosure());
		return () => ref.removeEventListener('click', detectDoubleTapClosure());
	}, [elementRef, onDoubleClick]);

	// return [];
}
