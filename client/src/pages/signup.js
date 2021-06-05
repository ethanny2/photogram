import React, { useEffect, useState, useContext } from 'react';
import logo from '../images/photogram-logo.png';
import * as ROUTES from '../constants/routes';
import { Link, useHistory } from 'react-router-dom';
import { validateEmail, upperCaseFullName, isInputAlphaBet } from '../utils';
import firebaseContext from '../context/firebase';
import { doesUsernameExist } from '../services/firebase';
const defaultProfilePicture =
	'https://photogram-media.s3.amazonaws.com/default-user-profile.jpg';

export default function SignUp() {
	const [username, setUsername] = useState('');
	const [fullName, setfullName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const isInvalid = password === '' || email === '' || fullName === '';

	const { firebase } = useContext(firebaseContext);
	const history = useHistory();

	useEffect(() => {
		document.title = 'Sign Up • Photogram';
	}, []);

	const handleSignUp = async (e) => {
		e.preventDefault();
		if (validateEmail(email) === false) {
			setError('Please enter a real email address');
			return;
		}
		const usernameExists = await doesUsernameExist(username);
		//If length is 0 that is falsey, if not length is 1 and user name exists
		if (!usernameExists.length) {
			try {
				const createdUserResult = await firebase
					.auth()
					.createUserWithEmailAndPassword(email, password);
				/* This is different from the documents in firestore this is on the auth side*/
				await createdUserResult.user.updateProfile({
					displayName: username,
					photoURL: defaultProfilePicture
				});
				// Userid in firstore is the uuid of the auth service account;
				// we can also use that auth service to change the profile picture
				// and add it as a property in all users document.
				await firebase.firestore().collection('users').add({
					userId: createdUserResult.user.uid,
					username: username.toLowerCase(),
					fullName,
					emailAddress: email.toLowerCase(),
					following: [],
					followers: [],
					dateCreated: Date.now(),
					profilePic: defaultProfilePicture,
					bio: ''
				});
				history.push(ROUTES.DASHBOARD);
			} catch (error) {
				setfullName('');
				setEmail('');
				setPassword('');
				setUsername('');
				setError(error.message);
			}
		} else {
			setEmail('');
			setPassword('');
			setfullName('');
			setUsername('');
			setError('That username is already taken, please try another.');
		}
	};

	return (
		<main className='container flex mx-auto max-w-xs items-center justify-center h-screen px-4 lg:px-0'>
			<div className='flex flex-col'>
				{/* Div to group form and logo */}
				<div className='flex flex-col items-center bg-white p-4 border mb-4'>
					<h1 className='flex justify-center w-full'>
						<img src={logo} alt='Instagram' className='mt-2 w-6/12 mb-4' />
					</h1>
					{error && (
						<p data-testid='error' className='mb-4 text-xs text-red-500'>
							{error}
						</p>
					)}
					<form data-testid='signup' onSubmit={handleSignUp} autoComplete='off'>
						<input
							aria-label='Enter your username'
							className='text-sm w-full text-gray bg-gray-background mr-3 py-5 px-4 h-2 border rounded mb-2'
							type='text'
							placeholder='Username'
							value={username}
							onChange={({ target }) => setUsername(target.value.toLowerCase())}
							required
							maxLength='10'
							minLength='5'
							autoComplete='off'
						/>
						<input
							aria-label='Enter full name'
							className='text-sm w-full text-gray bg-gray-background mr-3 py-5 px-4 h-2 border rounded mb-2'
							type='text'
							placeholder='Full name'
							value={fullName}
							onChange={({ target }) => {
								if (isInputAlphaBet(target.value)) {
									setfullName(upperCaseFullName(target.value));
								}
							}}
							required
						/>

						<input
							aria-label='Enter your email address'
							className='text-sm w-full text-gray bg-gray-background mr-3 py-5 px-4 h-2 border rounded mb-2'
							type='text'
							placeholder='Email address'
							value={email}
							onChange={({ target }) => setEmail(target.value.toLowerCase())}
							required
						/>
						<input
							aria-label='Enter your password'
							className='text-sm w-full text-gray bg-gray-background mr-3 py-5 px-4 h-2 border rounded mb-2'
							type='password'
							placeholder='Password'
							value={password}
							onChange={({ target }) => setPassword(target.value)}
							required
							minLength='6'
						/>

						<button
							disabled={isInvalid}
							type='submit'
							className={`bg-blue-500 text-white w-full rounded h-8 font-bold ${
								isInvalid && 'opacity-50 cursor-not-allowed'
							}`}
						>
							Sign Up
						</button>
					</form>
				</div>
				{/* Div for the Login up portion separated */}
				<div className='flex justify-center items-center flex-col w-full bg-white p-4 border'>
					<p className='text-sm'>
						Have an account?{' '}
						<Link to={ROUTES.LOGIN} className='font-bold text-blue-500'>
							Log in
						</Link>
					</p>
				</div>
			</div>
		</main>
	);
}
