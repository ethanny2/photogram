import PropTypes from 'prop-types';
import LightBoxContext from '../../context/lightbox';
import useLightbox from '../../hooks/useLightbox';
import LightBox from '../LightBox';
import { useEffect } from 'react';

export default function SinglePhoto({ photo, linkedPostData }) {
	// Is having multiple listeners for this too much??
	const {
		visible,
		comments,
		setComments,
		totalLikes,
		userLiked,
		dispatch,
		onDismiss
	} = useLightbox(photo.likes.length, photo.userLiked, photo.comments);

	// Needs to render twice before this value is actually in here. The
	// value passed into useLightbox may still be the value from the
	// first render (false)
	useEffect(() => {
		dispatch({ totalLikes: photo.likes.length, userLiked: photo.userLiked });
	}, [photo, dispatch]);

	// console.log('In single photo', { linkedPostData });
	return (
		<LightBoxContext.Provider
			value={{
				visible,
				content: { ...photo },
				setComments,
				dispatch,
				onDismiss,
				comments,
				totalLikes,
				userLiked
			}}
		>
			{visible ? <LightBox /> : null}
			<figure
				ref={
					photo.docId === linkedPostData?.linkedPhotoId
						? linkedPostData?.setRef
						: null
				}
				key={photo.docId}
				id={photo.docId}
				className='relative group col-span-1 h-80'
				onClick={(e) => {
					// Or else the click will count as a click outside the
					// lightbox and instantly close it.
					e.stopPropagation();
					console.log('Calling on click for a single photo');
					dispatch({
						visible: true
					});
				}}
			>
				<img
					className='object-fill w-full block max-w-full	max-h-full h-full'
					src={photo?.imageSrc}
					alt={photo?.caption}
				/>
				{/* This is leaking out on smaller devices widths */}
				<div className='hidden absolute bottom-0 left-0 z-10 w-full justify-evenly items-center h-full  bg-black bg-opacity-50 group-hover:flex'>
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
						{totalLikes}
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
						{comments?.length}
					</p>
				</div>
			</figure>
		</LightBoxContext.Provider>
	);
}

SinglePhoto.propTypes = {
	photo: PropTypes.object.isRequired
};
