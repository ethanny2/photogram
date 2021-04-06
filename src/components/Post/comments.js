import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AddComment from './addComment';
import { formatDistance } from 'date-fns';
import PropTypes from 'prop-types';

export default function Comments({
	docId,
	comments: allComments,
	posted,
	commentInput,
	setLightboxConfig,
	content
}) {
	const [comments, setComments] = useState(allComments);
	useEffect(() => {
		setLightboxConfig({
			comments
		});
	}, [comments, setLightboxConfig]);
	return (
		<>
			<div className='p-4 pt-1 pb-4'>
				{comments.length >= 3 && (
					// On click show lightbox
					<p
						onClick={() => {
							console.log('Clicked view all comments');
							// Have to pass local state for comments in here + setter
							// in order to have the change reflected on the lightbox itself
							// and on the actual post
							setLightboxConfig({
								visible: true,
								content,
								comments,
								setComments
							});
						}}
						className='text-sm text-gray-500 mb-1 cursor-pointer'
					>
						View all comments
					</p>
				)}
				{/* Get LAST 3 comments or 1 to get recent comments  */}
				{comments.slice(Math.max(comments.length - 3, 1)).map((item) => {
					return (
						<p key={`${item.comment}-${item.displayName}`} className='mb-1'>
							<Link to={`/p/${item.displayName}`}>
								<span className='mr-1 font-bold'>{item.displayName}</span>
							</Link>
							<span>{item.comment}</span>
						</p>
					);
				})}
				<p className='text-gray-500 text-xs mt-2'>
					{formatDistance(posted, new Date())} ago
				</p>
			</div>
			<AddComment
				docId={docId}
				comments={comments}
				setComments={setComments}
				commentInput={commentInput}
			></AddComment>
		</>
	);
}

Comments.propTypes = {
	docId: PropTypes.string.isRequired,
	comments: PropTypes.array.isRequired,
	posted: PropTypes.number.isRequired,
	commentInput: PropTypes.object.isRequired,
	setLightboxConfig: PropTypes.func.isRequired,
	content: PropTypes.object.isRequired
};
