import useFirestoreSnapshot from '../hooks/useFirebaseSnapshot';
import { useContext } from 'react';
import UserContext from '../context/user';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import useUser from '../hooks/useUser';

export default function Notifications() {
	const { user: loggedInUser } = useContext(UserContext);
	const { user } = useUser(loggedInUser?.uid);
	console.log('user inside the notifications component', { user });
	// useFirestoreSnapshot(user.userId);
	return (
		<div className='relative'>
			<Link to={ROUTES.NOT_FOUND} arial-label='Notifications'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					className='w-8 text-black-light cursor-pointer'
					fill='none'
					viewBox='0 0 24 24'
					stroke='currentColor'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
					/>
				</svg>
			</Link>
			<ul
				className={`m1-3 xs2:ml-1 md:-ml-3 absolute bg-white w-2/12 xs2:w-6/12 lg:w-8/12 py-2  max-w-sm shadow-md rounded border border-gray-100
					flex flex-col`}
				style={{ maxWidth: '17rem', minWidth: '10rem' }}
			>
				<li className='ml-3 lg:px-2 flex flex-row justify-start items-center'>
					<div className='mr-3 '>
						<p>No users found</p>
					</div>
				</li>
				<li className='ml-3 lg:px-2 flex flex-row justify-start items-center'>
					<div className='mr-3 '>
						<p>No users found</p>
					</div>
				</li>
				<li className='ml-3 lg:px-2 flex flex-row justify-start items-center'>
					<div className='mr-3 '>
						<p>No users found</p>
					</div>
				</li>
			</ul>
		</div>
	);
}
