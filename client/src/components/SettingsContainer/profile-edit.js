// import LoggedInUserContext from '../../context/logged-in-user';
import { useEffect, useContext, useState } from 'react';
import LoggedInUserContext from '../../context/logged-in-user';
import Skeleton from 'react-loading-skeleton';
import {
	doesUsernameExist,
	updateProfileByDocId
} from '../../services/firebase';

export default function ProfileEdit() {
	const { user } = useContext(LoggedInUserContext);
	const [name, setName] = useState('');
	const [username, setUsername] = useState('');
	const [bio, setBio] = useState('');
	const [publicFileUrl, setPublicFileUrl] = useState(null);
	const [message, setMessage] = useState('');
	const handleFileChange = async ({ target }) => {
		const [file] = target.files;
		if (!file) return;
		getSignedRequest(file);
	};

	const getSignedRequest = async (file) => {
		// Show skeleton for image preview
		try {
			const response = await fetch(
				`http://localhost:3001/sign-s3?username=${user.username}&file-name=${file.name}&file-type=${file.type}`
			);
			const { signedRequest: signedRequestUrl, url } = await response.json();
			// Send the PUT request with newly signed S3 url once it works
			// the resource is publicy available if it succeeds.
			const putResponse = await fetch(signedRequestUrl, {
				method: 'PUT',
				body: file,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			});

			// const data = await putResponse.json();
			if (putResponse.ok) {
				setPublicFileUrl(url);
			}
		} catch (error) {
			//Set some error state on the form
			console.error({ error });
		}
	};
	useEffect(() => {
		setMessage('');
	}, [bio, name, publicFileUrl, username]);

	useEffect(() => {
		if (user?.username) {
			setName(user.fullName);
			setUsername(user.username);
			setBio(user.bio);
		}
	}, [user]);

	async function handleSubmit(e) {
		e.preventDefault();
		// Take all the data and from inputs and submit it to
		// update the user document in the collection expect email.
		// Only check if username exists if they changed it
		if (user.username !== username) {
			let usernameTaken = await doesUsernameExist(username);
			if (usernameTaken.length) {
				setMessage('That username is taken please try again.');
				return;
			}
		}
		// Need to check if they changed profile pic
		publicFileUrl
			? await updateProfileByDocId(
					publicFileUrl,
					name,
					username,
					bio,
					user.docId
			  )
			: await updateProfileByDocId(
					user.profilePic,
					name,
					username,
					bio,
					user.docId
			  );

		setMessage('Successfully changed profile; refresh to see changes');
	}

	return (
		<>
			{user?.username ? (
				<form
					onSubmit={handleSubmit}
					autoComplete='off'
					method='post'
					className=' h-full w-10/12 py-3 flex flex-col justify-evenly items-center h-20'
				>
					<div className='mb-5 w-full flex flex-row justify-start xs2:justify-center items-center'>
						<img
							className='mx-5 xs2:w-10 xs2:h-9 w-10 h-10 md:w-20  md:h-20  rounded-full flex'
							src={publicFileUrl ? publicFileUrl : user.profilePic}
							alt={`${user.username} profile`}
						/>

						<div className='flex flex-col  text-left'>
							<p className='text-md font-bold sm:text-xl'> {user.username}</p>
							<label
								tabIndex='0'
								role='button'
								htmlFor='photo-upload'
								className='flex flex-row justify-between items-center text-blue-500 flex  w-10/12 font-bold text-sm  h-9'
								onKeyDown={(e) => {
									if (
										e.key === ' ' ||
										e.key === 'Enter' ||
										e.key === 'Spacebar'
									) {
										e.target.click();
									}
								}}
							>
								Change Profile Picture
							</label>
							<div className='text-center'>
								<input
									onChange={handleFileChange}
									accept='image/*'
									type='file'
									name='photo-upload'
									id='photo-upload'
									className='hidden'
								/>
							</div>
						</div>
					</div>
					<div className=' mb-5 w-full flex flex-col justify-start items-center '>
						<label
							className=' w-full font-bold text-md text-left'
							htmlFor='name'
						>
							Name
						</label>
						<input
							className='  rounded w-full focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50  border-gray-primary border '
							type='text'
							name='name'
							id='name'
							value={name}
							onChange={({ target }) => setName(target.value)}
						/>
						<span className='text-xs text-left text-gray-500 mt-2'>
							Help people discover your account by using the name you're known
							by: either your full name, nickname, or business name.
						</span>
					</div>
					<div className=' mb-5 w-full flex flex-col justify-start items-center '>
						<label
							className=' w-full font-bold text-md text-left'
							htmlFor='username'
						>
							Username
						</label>
						<input
							className='  rounded w-full focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50  border-gray-primary border '
							type='text'
							name='username'
							id='username'
							value={username}
							onChange={({ target }) => setUsername(target.value)}
						/>
						<span className='text-xs text-left  text-gray-500 mt-2'>
							In most cases, you won't be able to change your username back to{' '}
							{user.username} as it may be claimed by another user.
						</span>
					</div>
					<div className='mb-5 w-full flex flex-col justify-start items-center '>
						<label
							className=' w-full font-bold text-md text-left'
							htmlFor='bio'
						>
							Bio
						</label>
						<textarea
							className='  rounded w-full focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50  border-gray-primary border '
							type='text'
							name='bio'
							id='bio'
							value={bio}
							onChange={({ target }) => setBio(target.value)}
						></textarea>
					</div>
					<div className='mb-5 w-full flex flex-col justify-start items-center text-left'>
						<p className='text-sm font-bold  w-full text-gray-500'>
							Personal Information
						</p>
						<span className='text-xs  text-gray-500'>
							Provide your personal information, even if the account is used for
							a business, a pet or something else. This won't be a part of your
							public profile.
						</span>
					</div>
					<div className='mb-5 w-full flex flex-col justify-start items-center '>
						<label
							className=' w-full font-bold text-md text-left'
							htmlFor='email'
						>
							Email
						</label>
						<input
							disabled
							className=' bg-gray-300 cursor-not-allowed	rounded w-full focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50  border-gray-primary border '
							type='text'
							name='email'
							id='email'
							value={user.emailAddress}
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
