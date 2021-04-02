import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import daliAvatar from '../../images/avatars/dali.jpg';
import { memo } from 'react';

const User = ({ username, fullName }) => {
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
							src={daliAvatar}
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

export default memo(User);
