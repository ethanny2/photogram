import PropTypes from 'prop-types';

export default function Media({ src, caption }) {
	return (
		<div className='col-span-2 h-full'>
			<img className="w-full object-fill" src={src} alt={caption} />
		</div>
	);
}

Media.propTypes = {
	caption: PropTypes.string.isRequired,
	src: PropTypes.string.isRequired
};
