import useNotifications from '../hooks/useNotifications';
import { useContext, useState } from 'react';
import UserContext from '../context/user';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import useUser from '../hooks/useUser';

export default function Notifications(positionBottom = true) {
	const { user: loggedInUser } = useContext(UserContext);
	const { user } = useUser(loggedInUser?.uid);
	const [visible, setVisible] = useState(false);
	console.log('user inside the notifications component', { user });
	const { notifications } = useNotifications();
	console.log({ notifications });
	return (
		<div
			className='relative'
			onClick={() => setVisible((prevState) => !prevState)}
		>
			{/* Only show blue dot if you have notifications */}
			{notifications?.length && (
				<div className='absolute left-5 top-0 rounded-full w-3 h-3 bg-blue-500'></div>
			)}
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
			{/* Change CSS depending on if this is rendered in the header or footer */}
			{positionBottom && visible && notifications?.length ? (
				<ul
					className={` -left-52 right-10 overflow-y-scroll -top-24 m1-3 xs2:ml-1 md:-ml-3 absolute bg-white 
					w-80 h-24 xs2:w-80 lg:w-8/12 py-2 shadow-md rounded
					border border-gray-100
						flex flex-col`}
					// style={{ maxWidth: '17rem', minWidth: '10rem' }}
				>
					{notifications.map((notification, idx) => {
						return (
							<Link
								to={{
									pathname: `${notification.contentLink}`,
									photoId: notification?.photoDocId
								}}
								key={notification.receiverId + ' ' + notification.dateCreated}
							>
								<li
									className={`ml-5 flex flex-row justify-start items-center ${
										notifications.length === idx + 1 ? '' : 'mb-5'
									}`}
								>
									<div className='mr-3 ' style={{ minWidth: '2rem' }}>
										<img
											className=' w-8 h-8 sm:w-8 sm:h-8 md:w-8 lg:w-12 rounded-full md:h-8 lg:h-12 flex'
											src={notification.senderProfilePic}
											alt={`${notification.senderUsername} profile`}
										/>
									</div>
									<div className='flex flex-col text-left'>
										<p className='text-md font-semibold'>
											{notification.senderUsername}
										</p>
										<p className='text-sm'>{notification.content}</p>
									</div>
								</li>
							</Link>
						);
					})}
					{/* <li className='ml-5 lg:px-2 flex flex-row justify-start items-center'>
						<div className='mr-3 '>
							<p>No users found</p>
						</div>
					</li>
					<li className='ml-5 lg:px-2 flex flex-row justify-start items-center'>
						<div className='mr-3 '>
							<p>No users found</p>
						</div>
					</li>
					<li className='ml-5 lg:px-2 flex flex-row justify-start items-center'>
						<div className='mr-3 '>
							<p>No users found</p>
						</div>
					</li> */}
				</ul>
			) : notifications?.length && visible ? (
				<p>This is in the top nav</p>
			) : (
				visible && (
					<ul
						className={` -left-52 right-10 overflow-y-scroll -top-14 m1-3 xs2:ml-1 md:-ml-3 absolute bg-white 
				w-80 h-12 xs2:w-6/12 lg:w-8/12 py-2  max-w-sm shadow-md rounded
				border border-gray-100
					flex flex-col`}
						// style={{ maxWidth: '17rem', minWidth: '10rem' }}
					>
						<li
							className={`ml-5 flex flex-row justify-start items-center mb-5`}
						>
							<div className='flex flex-col text-left'>
								<p className='text-md font-semibold'>No notifications</p>
							</div>
						</li>
					</ul>
				)
			)}
		</div>
	);
}
