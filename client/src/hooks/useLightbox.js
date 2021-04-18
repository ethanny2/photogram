import { useReducer, useEffect } from 'react';
const reducer = (state, newState) => ({ ...state, ...newState });

export default function useLightbox(initTotalLikes, initUserLiked, initComments) {
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

	// This hook is used on each light box; so for each post on the explore/timeline
	// This is a huge performance hit might just make it so the user can still scroll 
	// FIXME!

	// useEffect(() => {
	// 	const handleUserScroll = () => {
	// 		document.documentElement.style.setProperty(
	// 			'--scroll-y',
	// 			`${window.scrollY}px`
	// 		);
	// 	};
	// 	window.addEventListener('scroll', handleUserScroll);
	// 	return () => window.removeEventListener('scroll', handleUserScroll);
	// }, []);
	// useEffect(() => {
	// 	if (visible) {
	// 		/*Remember the position the user scrolled to so they don't get thrown
	// 		back to the top of the page */
	// 		const scrollY = document.documentElement.style.getPropertyValue(
	// 			'--scroll-y'
	// 		);
	// 		const root = document.getElementById('root');
	// 		root.style.top = `-${scrollY}`;
	// 		document.getElementById('root').classList.add('lightbox-open');
	// 	} else {
	// 		const root = document.getElementById('root');
	// 		const scrollY = root.style.top;
	// 		root.style.top = '';
	// 		document.getElementById('root').classList.remove('lightbox-open');
	// 		window.scrollTo(0, parseInt(scrollY || '0') * -1);
	// 	}
	// }, [visible]);
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
