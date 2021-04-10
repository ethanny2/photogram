import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { memo } from 'react';
import PropTypes from 'prop-types';

const User = ({ username, fullName, profilePic }) => {
	return (
		<div className='p-4'>
			{!username || !fullName ? (
				<Skeleton count={1} height={61} className='mb-5' />
			) : (
				<Link
					to={`/p/${username}`}
					className='grid grid-cols-4 gap-4 mb-4 items-center'
				>
					<div className='flex items-center justify-center col-span-1'>
						<img
							className='rounded-full w-16 mr-3'
							src={profilePic}
							alt='my profile'
						/>
					</div>
					<div className='col-span-3'>
						<p className='font-bold text-sm'>{username}</p>
						<p className='font-bold text-sm'>{fullName}</p>
					</div>
				</Link>
			)}
		</div>
	);
};

User.propTypes = {
	username: PropTypes.string.isRequired,
	fullName: PropTypes.string.isRequired,
	profilePic: PropTypes.string.isRequired
};

export default memo(User);
