import { useState, useContext } from 'react';
import FirebaseContext from '../../context/firebase';
import UserContext from '../../context/user';
import PropTypes from 'prop-types';

export default function AddComment({
	docId,
	comments,
	setComments,
	commentInput
}) {
	const { firebase, FieldValue } = useContext(FirebaseContext);
	const {
		user: { displayName }
	} = useContext(UserContext);
	console.log(displayName);
	const [comment, setComment] = useState('');
	const handleSumbit = async (event) => {
		event.preventDefault();
		//Add new comment and set state in comment.js component
		setComments([{ displayName, comment }, ...comments]);
		//Clear local state for writing in input
		setComment('');
		return firebase
			.firestore()
			.collection('photos')
			.doc(docId)
			.update({
				comments: FieldValue.arrayUnion({ displayName, comment })
			});
	};
	return (
		<div className='border-t border-gray'>
			<form
				data-testid={`submit-comment-${docId}`}
				action='POST'
				className='flex w-full justify-between pr-5 pl-0'
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
	docId: PropTypes.string.isRequired,
	comments: PropTypes.array.isRequired,
	setComments: PropTypes.func.isRequired,
	commentInput: PropTypes.object.isRequired
};
