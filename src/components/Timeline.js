import { useContext, useReducer, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import useFollowedUserPhotos from '../hooks/useFollowedUsersPhotos';
import Post from '../components/Post';
import LoggedInUserContext from '../context/logged-in-user';
import LightBoxContext from '../context/lightbox';
import LightBox from '../components/LightBox';
/*
const LightboxContext = createContext({
	visible: false,
	onDismiss: () => {},
	content: null,
	setContent: () => {}
});
*/
const reducer = (state, newState) => ({ ...state, ...newState });
const lightboxInitialState = {
	visible: false,
	onDismiss: () => {},
	content: null
};

export default function Timeline() {
	const { user } = useContext(LoggedInUserContext);
	const { photos } = useFollowedUserPhotos(user);
	console.log({ photos });
	const [{ visible, content }, dispatch] = useReducer(
		reducer,
		lightboxInitialState
	);
	const onLightboxClose = () => dispatch({ visible: false });
	useEffect(() => {
		visible
			? (document.getElementById('root').style.filter = 'blur(2px)')
			: (document.getElementById('root').style.filter = '');
	}, [visible]);
	return (
		<LightBoxContext.Provider value={{ lightboxInitialState }}>
			{visible ? (
				<LightBox content={content} onDismiss={onLightboxClose} />
			) : null}
			<section className='col-span-3 md:col-span-2'>
				{photos ? (
					photos.map((photo) => {
						return (
							<Post
								setLightboxConfig={dispatch}
								key={photo.docId}
								content={photo}
							></Post>
						);
					})
				) : photos?.length <= 0 ? (
					<p>No posts from followers yet!</p>
				) : (
					<Skeleton count={4} width={640} height={500} className='mb-5' />
				)}
			</section>
		</LightBoxContext.Provider>
	);
}
