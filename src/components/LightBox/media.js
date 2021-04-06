import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
export default function Media({ src = '', caption }) {
	return (
		<div className=' hidden md:block md:w-8/12  md:h-full'>
			{src ? (
				<img className='w-full h-full object-fill' src={src} alt={caption} />
			) : (
				<Skeleton count={1} width={640} height={500} className='mb-5' />
			)}
		</div>
	);
}

Media.propTypes = {
	caption: PropTypes.string.isRequired,
	src: PropTypes.string.isRequired
};
