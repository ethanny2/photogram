import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AddComment from './addComment';
import { formatDistance } from 'date-fns';
import PropTypes from 'prop-types';
import LightBoxContext from '../../context/lightbox';

export default function Comments({ commentInput }) {
	const { content, comments, dispatch } = useContext(LightBoxContext);
	const posted = content.dateCreated;
	return (
		<>
			<div className='p-4 pt-1 pb-4'>
				{comments?.length >= 3 && (
					// On click show lightbox
					<p
						onClick={(e) => {
							// Or else the click will count as a click outside the
							// lightbox and instantly close it.
							e.stopPropagation();
							// Have to pass local state for comments in here + setter
							// in order to have the change reflected on the lightbox itself
							// and on the actual post
							dispatch({
								visible: true
							});
						}}
						className='text-sm text-gray-500 mb-1 cursor-pointer'
					>
						View all comments
					</p>
				)}
				{/* Get LAST 3 comments or 1 to get recent comments  */}
				{comments?.slice(0, 3).map((item) => {
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
					{posted && formatDistance(posted, new Date())} ago
				</p>
			</div>
			<AddComment commentInput={commentInput}></AddComment>
		</>
	);
}

Comments.propTypes = {
	commentInput: PropTypes.object.isRequired
};
