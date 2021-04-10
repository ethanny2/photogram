import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Header({ username, profilePic }) {
	return (
		<header className='flex border-b h-4 p-4 py-8 '>
			<div className='flex items-center'>
				<Link to={`/p/${username}`} className='flex items-center'>
					<img
						className='rounded h-8 w-8 flex mr-3'
						src={profilePic}
						alt={`${username} profile`}
					/>
				</Link>
				<p className='font-bold'>{username}</p>
			</div>
		</header>
	);
}

Header.propTypes = {
	username: PropTypes.string.isRequired,
	profilePic: PropTypes.string.isRequired
};
