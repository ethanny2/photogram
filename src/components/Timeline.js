import { useContext, useReducer, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import useFollowedUserPhotos from '../hooks/useFollowedUsersPhotos';
import Post from '../components/Post';
import LoggedInUserContext from '../context/logged-in-user';
import LightBoxContext from '../context/lightbox';
import LightBox from '../components/LightBox';
import useLightbox from '../hooks/useLightbox';
/*
const LightboxContext = createContext({
	visible: false,
	onDismiss: () => {},
	content: null,
	setContent: () => {}
});
*/
export default function Timeline() {
	const { user } = useContext(LoggedInUserContext);
	const { photos } = useFollowedUserPhotos(user);
	console.log({ photos });
	const [
		visible,
		content,
		comments,
		setComments,
		dispatch,
		onLightboxClose
	] = useLightbox();
	const lightboxState = {
		visible,
		content,
		comments,
		setComments,
		dispatch,
		onLightboxClose
	};
	return (
		<LightBoxContext.Provider value={{ lightboxState }}>
			{visible ? (
				<LightBox/>
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
