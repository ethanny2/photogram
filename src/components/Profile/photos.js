import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import PropTypes from 'prop-types';
import useLightbox from '../../hooks/useLightbox';
import LightBoxContext from '../../context/lightbox';
import LightBox from '../LightBox';

// future future task: add a lightbox where you can add comments!
export default function Photos({ photos = null }) {
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
	// This needs to be localstate for all
	// const [allComments, setAllComments] = useState(comments);
	console.log('photos component on profile page', photos);
	return (
		<LightBoxContext.Provider value={{ lightboxState }}>
			{visible ? <LightBox /> : null}
			<div className='h-16 border-t border-gray mt-12 px-4 lg:px-0'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 mb-12 lg'>
					{!photos
						? [...new Array(9)].map((_, index) => (
								<Skeleton key={index} count={1} width={320} height={400} />
						  ))
						: photos && photos.length > 0
						? photos.map((photo) => {
								console.log('Current photo comments', photo.comments);
								return (
									<figure
										key={photo.docId}
										className='relative group col-span-1'
										//Comments state not updating when a new comment is added
										onClick={() =>
											dispatch({
												visible: true,
												content: photo,
												// This wil work but the comment won't update
												//after you submit need local state for each photo
												comments: photo.comments,
												setComments
											})
										}
									>
										<img src={photo.imageSrc} alt={photo.caption} />
										{/* This is leaking out on smaller devices widths */}
										<div className='hidden absolute bottom-0 left-0 z-10 w-full justify-evenly items-center h-full bg-gray-200 bg-black-faded group-hover:flex'>
											<p className='flex items-center text-white font-bold'>
												<svg
													xmlns='http://www.w3.org/2000/svg'
													fill='none'
													viewBox='0 0 24 24'
													stroke='currentColor'
													tabIndex={0}
													className='w-8 mr-4'
												>
													<path
														strokeLinecap='round'
														strokeLinejoin='round'
														strokeWidth={2}
														d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
													/>
												</svg>
												{photo.likes.length}
											</p>
											<p className='items-center flex text-white font-bold'>
												<svg
													xmlns='http://www.w3.org/2000/svg'
													fill='none'
													viewBox='0 0 24 24'
													stroke='currentColor'
													className='w-8 mr-4'
												>
													<path
														strokeLinecap='round'
														strokeLinejoin='round'
														strokeWidth={2}
														d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
													/>
												</svg>
												{photo.comments.length}
											</p>
										</div>
									</figure>
								);
						  })
						: null}
				</div>

				{!photos ||
					(photos && photos.length === 0 && (
						<p className='text-center text-2xl'>No Posts Yet</p>
					))}
			</div>
		</LightBoxContext.Provider>
	);
}

Photos.propTypes = {
	photos: PropTypes.array.isRequired
};
