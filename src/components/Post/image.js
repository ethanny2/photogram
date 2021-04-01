import PropTypes from 'prop-types';

export default function Image({ src, caption }) {
	return (
		<figure className='post__img'>
			<img className='w-full' src={src} alt={caption} />
		</figure>
	);
}

Image.propTypes = {
	src: PropTypes.string.isRequired,
	caption: PropTypes.string.isRequired
};
