import LoggedInUserContext from '../../context/logged-in-user';
import { useContext } from 'react';
import PropTypes from 'prop-types';
import LightBoxContext from '../../context/lightbox';
import { handleToggleLiked } from '../../services/firebase';
import { createNotification } from '../../services/firebase';

export default function Actions({ handleFocus }) {
	const { content, dispatch, totalLikes, userLiked } = useContext(
		LightBoxContext
	);
	const {
		user: { userId, username: loggedInUsername, profilePic: senderProfilePic }
	} = useContext(LoggedInUserContext);

	const { userId: receiverId, docId, username: receiverUsername } = content;
	const toggle = async () => {
		/* Swtich the local state for toggle ASYNC DON'T ASSUME ITS DONE*/
		try {
			// Works with opposite old value
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
		} catch (error) {
			console.error({ error });
		}
	};

	return (
		<>
			<div className='flex justify-between p-4'>
				<div className='flex'>
					<svg
						data-testid={`like-photo-${docId}`}
						onClick={() => toggle()}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								toggle();
							}
						}}
						className={`w-8 mr-4 h-8 select-none cursor-pointer 
						 ${userLiked ? 'fill-current text-red-500' : 'text-black'}`}
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
						tabIndex={0}
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
						/>
					</svg>
					<svg
						data-testid={`focus-input-${docId}`}
						onClick={handleFocus}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								handleFocus();
							}
						}}
						className='w-8 h-8 text-black-light select-none cursor-pointer'
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
						tabIndex={0}
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
						/>
					</svg>
				</div>
			</div>
			<div className='p-4 py-2 select-none'>
				<p className='font-bold select-none'>
					{totalLikes === 1 ? `${totalLikes} like` : `${totalLikes} likes`}
				</p>
			</div>
		</>
	);
}

Actions.propTypes = {
	handleFocus: PropTypes.func.isRequired
};
