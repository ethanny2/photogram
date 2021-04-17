import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
//User photo from auth profile will also be displayed here
export default function Header({ username, onDismiss, profilePic }) {
	return (
		<header className='p-2 px-4 flex w-full items-center justify-between border-b border-gray-primary py-4'>
			<div className='h-full'>
				<Link to={`/p/${username}`}>
					<img
						className='select-none w-7 lg:w-12 rounded h-6 lg:h-12 flex'
						src={profilePic}
						alt={username}
					/>
				</Link>
			</div>
			<p className='font-bold'>{username}</p>
			<span
				onKeyDown={({ key }) => key === 'Enter' && onDismiss()}
				className='font-bold cursor-pointer'
				onClick={onDismiss}
				tabIndex='0'
				aria-label='Close lightbox'
			>
				&#10005;
			</span>
		</header>
	);
}

Header.propTypes = {
	username: PropTypes.string.isRequired,
	onDismiss: PropTypes.func.isRequired,
	profilePic: PropTypes.string.isRequired
};
