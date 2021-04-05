import PropTypes from 'prop-types';
import sample from '../../images/avatars/dali.jpg';
import { Link } from 'react-router-dom';
//User photo from auth profile will also be displayed here
export default function Header({ username }) {
	return (
		<header className='flex w-full items-center justify-around border-b border-gray-primary py-4'>
			<div className='h-full'>
				<Link to={`/p/${username}`}>
					<img
						className=' w-7 lg:w-12 rounded h-6 lg:h-12 flex'
						src={sample}
						alt={username}
					/>
				</Link>
			</div>
			<p className='font-bold'>{username}</p>
		</header>
	);
}

Header.propTypes = {
	username: PropTypes.string.isRequired
};
