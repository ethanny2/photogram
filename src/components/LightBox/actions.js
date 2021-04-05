import PropTypes from 'prop-types';

export default function Actions({
	docId,
	totalLikes,
	likedPhoto,
	handleFocus
}) {
	return (
		<div>
			<p>ACTIONS WILL GO HERE</p>
		</div>
	);
}

Actions.propTypes = {
	docId: PropTypes.string.isRequired,
	totalLikes: PropTypes.number.isRequired,
	likedPhoto: PropTypes.bool.isRequired,
	handleFocus: PropTypes.func.isRequired
};
