import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AddComment from './addComment';
import { formatDistance } from 'date-fns';
import PropTypes from 'prop-types';
import Lightbox from '../LightBox';

export default function Comments({
	docId,
	comments: allComments,
	posted,
	commentInput,
	setLightboxConfig,
	content
}) {
	const [comments, setComments] = useState(allComments);
	return (
		<>
			{/* {lightboxVisible ? (
				<Lightbox visible={lightboxVisible} content={content} />
			) : null} */}
			<div className='p-4 pt-1 pb-4'>
				{comments.length >= 3 && (
					// On click show lightbox
					<p
						onClick={() => {
							console.log('Clicked view all comments');
							setLightboxConfig({
								visible: true,
								content
							});
						}}
						className='text-sm text-gray-500 mb-1 cursor-pointer'
					>
						View all comments
					</p>
				)}
				{comments.slice(0, 3).map((item) => {
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
