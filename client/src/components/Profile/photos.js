import Skeleton from 'react-loading-skeleton';
import PropTypes from 'prop-types';
import SinglePhoto from './single-photo';

export default function Photos({ photos = null, linkedPostData = null }) {
	console.log('Photos in on explore page', { photos });
	return (
		<div
			className='border-t border-gray mt-12 px-4 '
		>
			<div
				className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 mb-12'
			>
				{!photos ? (
					[...new Array(9)].map((_, index) => (
						<Skeleton key={index} count={1} height={400} />
					))
				) : photos && photos.length > 0 ? (
					photos.map((photo) => {
						// console.log('Current photo comments', photo.comments);
						return (
							<SinglePhoto
								linkedPostData={linkedPostData}
								key={photo.docId}
								photo={photo}
							/>
						);
					})
				) : (
					<p className='text-center text-2xl'>No Posts Yet</p>
				)}
			</div>
		</div>
	);
}

Photos.propTypes = {
	photos: PropTypes.array.isRequired
};
