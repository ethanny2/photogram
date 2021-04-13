import Skeleton from 'react-loading-skeleton';
import PropTypes from 'prop-types';
import SinglePhoto from './single-photo';

export default function Photos({ photos = null, linkedPostData = null }) {
	return (
		<div className='border-t border-gray mt-12 px-4 lg:px-0'>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 mb-12 lg'>
				{!photos
					? [...new Array(9)].map((_, index) => (
							<Skeleton key={index} count={1} width={320} height={400} />
					  ))
					: photos && photos.length > 0
					? photos.map((photo) => {
							// console.log('Current photo comments', photo.comments);
							return (
								<SinglePhoto
								linkedPostData={linkedPostData}
									key={photo.docId}
									photo={photo}
								/>
							);
					  })
					: null}
			</div>

			{!photos ||
				(photos && photos.length === 0 && (
					<p className='text-center text-2xl'>No Posts Yet</p>
				))}
		</div>
	);
}

Photos.propTypes = {
	photos: PropTypes.array.isRequired
};
