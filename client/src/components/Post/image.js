import { useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import useDoubleTap from '../../hooks/useDoubleTap';
import LightBoxContext from '../../context/lightbox';
import LoggedInUserContext from '../../context/logged-in-user';
import { handleToggleLiked, createNotification } from '../../services/firebase';

export default function Image({ src, caption }) {
	const doubleTapContent = useRef();
	const { content, dispatch, totalLikes, userLiked } = useContext(
		LightBoxContext
	);
	const {
		user: { userId, username: loggedInUsername, profilePic: senderProfilePic }
	} = useContext(LoggedInUserContext);
	const { userId: receiverId, docId, username: receiverUsername } = content;
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
				receiverUsername,
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
		<figure ref={doubleTapContent} className='post__img'>
			<img className='w-full' src={src} alt={caption} />
		</figure>
	);
}

Image.propTypes = {
	src: PropTypes.string.isRequired,
	caption: PropTypes.string.isRequired
};
