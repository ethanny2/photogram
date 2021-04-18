import { useState, useContext } from 'react';
import FirebaseContext from '../../context/firebase';
import LoggedInUserContext from '../../context/logged-in-user';
import PropTypes from 'prop-types';
import LightBoxContext from '../../context/lightbox';
import { createNotification } from '../../services/firebase';

export default function AddComment({ commentInput }) {
	const { firebase, FieldValue } = useContext(FirebaseContext);
	const {
		user: { username: loggedInUsername, profilePic: senderProfilePic }
	} = useContext(LoggedInUserContext);
	const { content, comments, dispatch } = useContext(LightBoxContext);
	const { userId: receiverId, docId, username: receiverUsername } = content;
	const [comment, setComment] = useState('');
	const handleSumbit = async (event) => {
		event.preventDefault();
		//Add new comment and set state in comment.js component
		// setComments([...comments, { displayName, comment }]);
		dispatch({
			comments: [...comments, { displayName: loggedInUsername, comment }]
		});

		// Send out notification
		const notifContent = `${loggedInUsername} commented: ${comment}`;
		await createNotification(
			receiverId,
			receiverUsername,
			senderProfilePic,
			notifContent,
			loggedInUsername,
			docId
		);
		await firebase
			.firestore()
			.collection('photos')
			.doc(docId)
			.update({
				comments: FieldValue.arrayUnion({
					displayName: loggedInUsername,
					comment
				})
			});
		//Clear local state for writing in input
		setComment('');
		return;
	};
	return (
		<div className='border-t border-gray flex-shrink-0 flex-grow'>
			<form
				data-testid={`submit-comment-${docId}`}
				action='POST'
				className='flex w-full justify-between pr-5 pl-0 h-full'
				onSubmit={(event) =>
					/*If comment length typed is 3 or more chars submit the comment
          otherwise just prevent the refresh */
					comment.length >= 3 ? handleSumbit(event) : event.preventDefault()
				}
			>
				<input
					data-testid={`add-comment-${docId}`}
					className='text-sm text-gray w-full mr-3 py-5 px-4'
					type='text'
					aria-label='Add a comment'
					autoComplete='off'
					name='add-comment'
					placeholder='Add a comment...'
					value={comment}
					onChange={({ target }) => setComment(target.value)}
					ref={commentInput}
				/>
				{/* Why not just make this type submit? */}
				<button
					className={`text-sm font-bold text-blue-500 ${
						comment.length < 3 && 'opacity-25'
					}`}
					type='button'
					disabled={comment.length < 3 ? true : false}
					onClick={handleSumbit}
				>
					Post
				</button>
			</form>
		</div>
	);
}

AddComment.propTypes = {
	commentInput: PropTypes.object.isRequired
};
