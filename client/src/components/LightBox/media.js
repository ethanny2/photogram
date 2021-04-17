import PropTypes from 'prop-types';
import { useState, useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import useDoubleTap from '../../hooks/useDoubleTap';
import LightBoxContext from '../../context/lightbox';
import LoggedInUserContext from '../../context/logged-in-user';
import { handleToggleLiked, createNotification } from '../../services/firebase';

export default function Media({ src = '', caption }) {
	const [showHeart, setShowHeart] = useState(false);
	const { content, dispatch, totalLikes, userLiked } = useContext(
		LightBoxContext
	);
	const {
		user: { userId, username: loggedInUsername, profilePic: senderProfilePic }
	} = useContext(LoggedInUserContext);
	const { userId: receiverId, docId, username: receiverUsername } = content;
	
	const onDoubleTap = async () => {
		setShowHeart(true);
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
		setTimeout(() => {
			setShowHeart(false);
		}, 350);
	};
	const [callbackRef] = useDoubleTap(onDoubleTap);
	return (
		<figure className=' hidden md:block md:w-8/12  md:h-full relative'>
			{src ? (
				<>
					<div
						ref={callbackRef}
						className={`z-20 absolute bottom-0 left-0 flex w-full justify-center items-center h-full`}
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className={`${
								showHeart ? 'scale-125 block' : ''
							} transition transform  duration-300 scale-0 h-20 w-20 fill-current	text-white opacity-80`}
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
							/>
						</svg>
					</div>
					<img className='w-full h-full object-fill' src={src} alt={caption} />
				</>
			) : (
				<Skeleton count={1} height={500} className='mb-5' />
			)}
		</figure>
	);
}

Media.propTypes = {
	caption: PropTypes.string.isRequired,
	src: PropTypes.string.isRequired
};
