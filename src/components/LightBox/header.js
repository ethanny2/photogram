import PropTypes from 'prop-types';

export default function Header({ username }) {
	return (
    <div>HERE IS THE HEADER</div>
	);
}

Header.propTypes = {
	username: PropTypes.string.isRequired
};
