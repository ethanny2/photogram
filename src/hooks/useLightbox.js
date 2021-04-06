import { useReducer, useEffect } from 'react';
const reducer = (state, newState) => ({ ...state, ...newState });
const lightboxInitialState = {
	visible: false,
	onDismiss: () => {},
	content: null,
	comments: [], //Separate to have localstate from post got here
	setComments: () => {}
};


//TODO: Need to figure out a way to calibrate the state of the post
// comments on the timeline and the modal. Also for the profile page
// there is no local state for comments so can this hook handle itself?
// E.g. the default setComments is some dispatch function changing
// the provider state, but it can be overwritten with your own setcomments
// such as in the timeline
export default function useLightbox() {
	const [{ visible, content, comments, setComments }, dispatch] = useReducer(
		reducer,
		lightboxInitialState
	);
	const addComment = (newComment) =>
		dispatch({ comments: [...comments, newComment] });
	const onLightboxClose = () => dispatch({ visible: false });
	useEffect(() => {
		const handleUserScroll = () => {
			document.documentElement.style.setProperty(
				'--scroll-y',
				`${window.scrollY}px`
			);
		};
		window.addEventListener('scroll', handleUserScroll);
		return () => window.removeEventListener('scroll', handleUserScroll);
	}, []);
	useEffect(() => {
		if (visible) {
			/*Remember the position the user scrolled to so they don't get thrown
			back to the top of the page */
			const scrollY = document.documentElement.style.getPropertyValue(
				'--scroll-y'
			);
			const root = document.getElementById('root');
			root.style.top = `-${scrollY}`;
			document.getElementById('root').classList.add('lightbox-open');
		} else {
			const root = document.getElementById('root');
			const scrollY = root.style.top;
			root.style.top = '';
			document.getElementById('root').classList.remove('lightbox-open');
			window.scrollTo(0, parseInt(scrollY || '0') * -1);
		}
	}, [visible]);
	return [visible, content, comments, setComments, dispatch, onLightboxClose];
}
