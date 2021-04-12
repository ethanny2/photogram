import PropTypes from 'prop-types';
import { useRef, useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import useDoubleTap from '../../hooks/useDoubleTap';
import LightBoxContext from '../../context/lightbox';
import LoggedInUserContext from '../../context/logged-in-user';
import { handleToggleLiked, createNotification } from '../../services/firebase';

export default function Media({ src = '', caption }) {
	const doubleTapContent = useRef();
	const { content, dispatch, totalLikes, userLiked } = useContext(
		LightBoxContext
	);
	const {
		user: { userId, username: loggedInUsername, profilePic: senderProfilePic }
	} = useContext(LoggedInUserContext);
	const { userId: receiverId, docId } = content;
	const onDoubleTap = async () => {
		console.log('DOUBLE TAP OCCURRED');
		// Need to update the likes so I need to bring the context in here
		//Switch to opposite
		await handleToggleLiked(userId, docId, userLiked);
		const newLikeAmount = userLiked ? totalLikes - 1 : totalLikes + 1;
		const newUserLiked = !userLiked;
		// Need a new notification here; only if liked not unliked
		if (newUserLiked) {
			const notifContent = `${loggedInUsername} liked your post.`;
			await createNotification(
				receiverId,
				senderProfilePic,
				notifContent,
				loggedInUsername,
				docId
			);
		}
		dispatch({ totalLikes: newLikeAmount, userLiked: newUserLiked });
	};
	useDoubleTap(doubleTapContent, onDoubleTap);
	return (
		<figure
			ref={doubleTapContent}
			className=' hidden md:block md:w-8/12  md:h-full'
		>
			{src ? (
				<img className='w-full h-full object-fill' src={src} alt={caption} />
			) : (
				<Skeleton count={1} width={640} height={500} className='mb-5' />
			)}
		</figure>
	);
}

Media.propTypes = {
	caption: PropTypes.string.isRequired,
	src: PropTypes.string.isRequired
};
