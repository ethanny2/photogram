import React from 'react';
import Skeleton from 'react-loading-skeleton';
import PropTypes from 'prop-types';

// future task: add onhover with the comments length & add the likes
// future future task: add a lightbox where you can add comments!
export default function Photos({ photos }) {
	return (
		<div className='h-16 border-t border-gray mt-12 pt-4'>
			<div className='grid grid-cols-3 gap-8 mt-4 mb-12'>
				{!photos
					? [...new Array(9)].map((_, index) => (
							<Skeleton key={index} count={1} width={320} height={400} />
					  ))
					: photos && photos.length > 0
					? photos.map((photo) => {
							return (
								<figure
									key={photo.docId}
									className='relative group col-span-1 transition-opacity	duration-500 z-10 '
								>
									{/* <div className='text-md text-black font-bold flex justify-center items-center h-full w-full
                   absolute bg-black bg-opacity-0 invisible bg-gray-200  duration-500
                     transition-opacity	  group-hover:bg-opacity-50  group-hover:visible group-hover:z-20'>
										testing
									</div> */}
									<img src={photo.imageSrc} alt={photo.caption} />
								</figure>
							);
					  })
					: null}
			</div>

			{!photos ||
				(photos && photos.length === 0 && (
					<p className='text-center text-2xl'>No Photos Yet</p>
				))}
		</div>
	);
}

Photos.propTypes = {
	photos: PropTypes.array.isRequired
};
