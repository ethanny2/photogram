import { useReducer, useEffect } from 'react';
const reducer = (state, newState) => ({ ...state, ...newState });

export default function useLightbox(
	initTotalLikes,
	initUserLiked,
	initComments
) {
	const lightboxInitialState = {
		visible: false,
		onDismiss: () => {},
		content: null,
		comments: initComments,
		totalLikes: initTotalLikes,
		userLiked: initUserLiked
	};
	const [
		{ visible, content, comments, totalLikes, userLiked },
		dispatch
	] = useReducer(reducer, lightboxInitialState);
	const onDismiss = () => dispatch({ visible: false });

	useEffect(() => {
		const [htmlElm] = document.getElementsByTagName('html');
		const rootElm = document.getElementById('root');
		if (visible) {
			rootElm.classList.add('lightbox-open');
			htmlElm.style.overflowY = 'hidden';
		} else {
			rootElm.classList.remove('lightbox-open');
			htmlElm.style.overflowY = '';
		}
		return () => {
			rootElm.classList.remove('lightbox-open');
			htmlElm.style.overflowY = '';
		};
	}, [visible]);
	return {
		visible,
		content,
		comments,
		totalLikes,
		userLiked,
		dispatch,
		onDismiss
	};
}
