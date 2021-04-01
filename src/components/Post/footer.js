import PropTypes from 'prop-types';

export default function Footer({ username, caption }) {
	return (
		<footer className='p-4 pt-2 pb-0'>
			<span className='mr-1 font-bold'>{username}</span>
			<span>{caption}</span>
		</footer>
	);
}

Footer.propTypes = {
	username: PropTypes.string.isRequired,
	caption: PropTypes.string.isRequired
};
