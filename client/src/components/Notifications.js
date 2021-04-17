import useNotifications from '../hooks/useNotifications';
import { useContext, useState, useRef } from 'react';
import UserContext from '../context/user';
import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';
import useOutsideClick from '../hooks/useOutsideClick';
import {
	clearNotificationByDocId,
	clearAllNotificationsByUserId
} from '../services/firebase';

export default function Notifications() {
	const { user } = useContext(UserContext);
	// uid from auth account is the same value as the user documents userId
	const userId = user?.uid;
	const [visible, setVisible] = useState(false);
	const { notifications } = useNotifications();
	const notificationRef = useRef(null);
	const dismissFunction = () => setVisible(false);
	useOutsideClick(notificationRef, dismissFunction);

	// Deleting from the collection should actually
	// delete the local component state as well because the most recent
	// value is given through our hook / firebase snapshot
	const clearNotification = async (docId) => {
		await clearNotificationByDocId(docId);
	};
	const clearAllNotifications = async (userId) => {
		await clearAllNotificationsByUserId(userId);
	};

	return (
		<div
			ref={notificationRef}
			className='relative'
			onClick={() => setVisible((prevState) => !prevState)}
		>
			{notifications?.length ? (
				<div className='fixed rounded-full w-3 h-3 bg-blue-500'></div>
			) : null}
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
			{visible && notifications?.length > 0 ? (
				<ul
					className={`z-20 right-0 overflow-y-scroll top-16 ml-3 xs2:ml-1 md:-ml-3 fixed bg-white 
					w-80 h-32 xs2:w-80 lg:w-8/12 py-2 shadow-md rounded
					border border-gray-100
						flex flex-col`}
						style={{maxWidth: '25rem'}}
				>
					<li
						className={`py-1 flex flex-row justify-center text-center items-center mb-3 border-b border-gray-primary`}
						onClick={() => clearAllNotifications(userId)}
					>
						<p className='w-full'> Clear all notifications</p>
					</li>
					{notifications.map((notification, idx) => {
						return (
							<Link
								to={{
									pathname: `${notification.contentLink}`,
									photoId: notification?.photoDocId
								}}
								key={notification.docId}
								onClick={() => clearNotification(notification.docId)}
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
										<p className='text-gray-500 text-xs mt-2'>
											{notification &&
												formatDistance(
													notification.dateCreated,
													new Date()
												)}{' '}
											ago
										</p>
									</div>
								</li>
							</Link>
						);
					})}
				</ul>
			) : (
				visible && (
					<ul
						className={`z-20 right-0 overflow-y-scroll top-16 ml-3 xs2:ml-1 md:-ml-3 fixed bg-white 
					w-80 h-15 xs2:w-80 lg:w-8/12 py-2 shadow-md rounded
					border border-gray-100
						flex flex-col`}
						style={{maxWidth: '25rem'}}
					>
						<li
							className={`py-1 flex flex-row justify-start text-center items-center`}
						>
							<p className='w-full'> No notifications</p>
						</li>
					</ul>
				)
			)}
		</div>
	);
}
