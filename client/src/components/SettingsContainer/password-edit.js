// import LoggedInUserContext from '../../context/logged-in-user';
import { useContext, useState } from 'react';
import LoggedInUserContext from '../../context/logged-in-user';
import Skeleton from 'react-loading-skeleton';
import { changePassword } from '../../services/firebase';

export default function PasswordEdit() {
	const { user } = useContext(LoggedInUserContext);
	const [oldPass, setOldPass] = useState('');
	const [newPass, setNewPass] = useState('');
	const [confirmPass, setConfirmPass] = useState('');
	const [message, setMessage] = useState('');

	async function handleSubmit(e) {
		e.preventDefault();
		if (newPass !== confirmPass) {
			setMessage('Please ensure password fields match');
			return;
		}
		try {
			await changePassword(oldPass, newPass);
			setMessage('Successfully changed password');
		} catch (error) {
			setMessage(error.message);
		}
	}

	return (
		<>
			{user?.username ? (
				<form
					onSubmit={handleSubmit}
					autoComplete='off'
					method='post'
					className=' h-full w-10/12 py-2 flex flex-col justify-between items-center h-20'
				>
					<div className='mb-5 w-full flex flex-row justify-start items-center'>
						<img
							className='mx-5 xs2:w-10 xs2:h-9 w-10 h-10 md:w-10 lg:w-12 rounded-full md:h-10 lg:h-12 flex'
							src={user.profilePic}
							alt={`${user.username} profile`}
						/>
						<div className='flex flex-col  text-left'>
							<p className='text-md font-bold'> {user.username}</p>
						</div>
					</div>
					<div className=' mb-5 w-full flex flex-col justify-start items-center '>
						<label
							className=' w-full font-bold text-md text-left'
							htmlFor='oldpass'
						>
							Old Password
						</label>
						<input
							className='  rounded w-full focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50  border-gray-primary border '
							type='password'
							name='oldpass'
							id='oldpass'
							value={oldPass}
							onChange={({ target }) => setOldPass(target.value)}
						/>
					</div>
					<div className=' mb-5 w-full flex flex-col justify-start items-center '>
						<label
							className=' w-full font-bold text-md text-left'
							htmlFor='newpass'
						>
							New Password
						</label>
						<input
							className='  rounded w-full focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50  border-gray-primary border '
							type='password'
							name='newpass'
							id='newpass'
							value={newPass}
							onChange={({ target }) => setNewPass(target.value)}
						/>
					</div>
					<div className='mb-5 w-full flex flex-col justify-start items-center '>
						<label
							className=' w-full font-bold text-md text-left'
							htmlFor='confirmpass'
						>
							Confirm New Password
						</label>
						<input
							className='  rounded w-full focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50  border-gray-primary border '
							type='password'
							name='confirmpass'
							id='confirmpass'
							value={confirmPass}
							onChange={({ target }) => setConfirmPass(target.value)}
						/>
					</div>
					<button
						className='font-bold text-sm rounded text-white bg-blue-500  w-20 h-8'
						type='submit'
					>
						Submit
					</button>
					{message ? (
						<p className='mt-5 text-xs text-gray-500 w-full'>{message}</p>
					) : null}
				</form>
			) : (
				<Skeleton height={300} count={1} />
			)}
		</>
	);
}
