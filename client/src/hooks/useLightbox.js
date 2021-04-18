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
		if (visible) {
			document.getElementById('root').classList.add('lightbox-open');
			document.getElementsByTagName('html')[0].style.overflowY = 'hidden';
		} else {
			document.getElementById('root').classList.remove('lightbox-open');
			document.getElementsByTagName('html')[0].style.overflowY = 'initial';
		}

		return () => {
			document.getElementById('root').classList.remove('lightbox-open');
			document.getElementsByTagName('html')[0].style.overflowY = 'initial';
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
