// import LoggedInUserContext from '../../context/logged-in-user';
import { useContext, useState } from 'react';
import LoggedInUserContext from '../../context/logged-in-user';
import Skeleton from 'react-loading-skeleton';
import { deleteAccount } from '../../services/firebase';
import { useHistory } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
export default function PrivacyEdit() {
	const { user } = useContext(LoggedInUserContext);
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState('');
	const [confirmVisible, setConfirmVisible] = useState(false);
	const history = useHistory();
	async function handleSubmit(e) {
		e.preventDefault();
		if (password.length < 6) {
			setMessage('Please enter your password.');
			return;
		}
		try {
			await deleteAccount(password, user.userId);
			history.push(ROUTES.LOGIN);
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
					className=' h-full w-10/12 py-2 flex flex-col justify-evenly items-center h-20'
				>
					<div className='mb-5 w-full flex flex-col justify-start items-center'>
						<p className='text-xl font-bold w-full mb-5'>Account Security</p>
						<p className='text-left w-full text-sm mb-3 text-gray-500'>
							Warning
						</p>
						<p className='text-sm text-gray-500'>
							This action cannot be undone, once you delete your account, there
							is no going back. Please be certain. This will permanently delete
							the account and all the data stored for your account!
						</p>
					</div>

					{confirmVisible ? (
						<>
							<div className='mb-5 w-full flex flex-col justify-start items-center'>
								<p className='w-full text-sm mb-3'>
									This is will <span className='font-bold'>permanently</span>{' '}
									delete all of the data associated with your account with{' '}
									<span className='font-bold'> no way to recover it.</span>
								</p>
								<label htmlFor='password' className='font-bold w-full text-sm'>
									Enter password to confirm
								</label>
								<input
									required
									className='rounded w-full focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50  border-gray-primary border '
									type='text'
									name='password'
									id='password'
									value={password}
									onChange={({ target }) => setPassword(target.value)}
								/>
							</div>
							<button
								className='font-bold text-sm rounded text-white bg-red-500 p-1.5'
								type='submit'
								onClick={handleSubmit}
							>
								Delete Account
							</button>
						</>
					) : (
						<button
							className='font-bold text-sm rounded text-white bg-red-500  p-1.5 '
							type='button'
							onClick={() => setConfirmVisible(true)}
						>
							Delete Account
						</button>
					)}

					{message ? (
						<p className='mt-5 text-xs text-center text-gray-500 w-full'>
							{message}
						</p>
					) : null}
				</form>
			) : (
				<Skeleton height={300} count={1} />
			)}
		</>
	);
}
