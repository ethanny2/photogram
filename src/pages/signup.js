import React, { useEffect, useState, useContext } from 'react';
import phoneImg from '../images/iphone-with-profile.jpg';
import logo from '../images/logo.png';
import * as ROUTES from '../constants/routes';
import { Link, useHistory } from 'react-router-dom';
import { validateEmail, upperCaseFullName, isInputAlphaBet } from '../utils';
import firebaseContext from '../context/firebase';
import { doesUsernameExist } from '../services/firebase';

/*
  Setup state and error handling/ form validation.
  Store user name as lowerCase (even while typing)
  Uppercase the First char of Full name and last name
*/

export default function SignUp() {
	const [username, setUsername] = useState('');
	const [fullName, setfullName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const isInvalid =
		password === '' ||
		email === '' ||
		fullName === '' ||
		validateEmail(email) === false;
	const { firebase } = useContext(firebaseContext);
	const history = useHistory();

	useEffect(() => {
		document.title = 'Sign Up - Instagram';
	}, []);

	const handleSignUp = async (e) => {
		e.preventDefault();
		const usernameExists = await doesUsernameExist(username);
		//If length is 0 that is falsey, if not length is 1 and user name exists
		if (!usernameExists.length) {
			console.log('This username is not in use');
			try {
				const createdUserResult = await firebase
					.auth()
					.createUserWithEmailAndPassword(email, password);
				console.log({ createdUserResult });
				console.log('Signup successfull');
				/* This is different from the documents in firestore this is on the auth side*/
				await createdUserResult.user.updateProfile({
					displayName: username
				});
				await firebase.firestore().collection('users').add({
					userId: createdUserResult.user.uid,
					username: username.toLowerCase(),
					fullName,
					emailAddress: email.toLowerCase(),
					following: [],
					followers: [],
					dateCreated: Date.now()
				});
				history.push(ROUTES.DASHBOARD);
			} catch (error) {
				setfullName('');
				setError(error.message);
				console.log('Signup failed');
			}
		} else {
			setEmail('');
			setPassword('');
			setfullName('');
			setUsername('');
			setError('That username is already taken, please try another.');
			console.log('That user name is already in use');
		}
	};

	return (
		<section className='container flex mx-auto max-w-xs items-center justify-center h-screen'>
			<div className='flex flex-col'>
				{/* Div to group form and logo */}
				<div className='flex flex-col items-center bg-white p-4 border mb-4'>
					<h1 className='flex justify-center w-full'>
						<img src={logo} alt='Instagram' className='mt-2 w-6/12 mb-4' />
					</h1>
					{error && <p className='mb-4 text-xs text-red-500'>{error}</p>}
					<form onSubmit={handleSignUp} autoComplete='off'>
						<input
							aria-label='Enter your username'
							className='text-sm w-full text-gray bg-gray-background mr-3 py-5 px-4 h-2 border rounded mb-2'
							type='text'
							placeholder='Username'
							value={username}
							onChange={({ target }) => setUsername(target.value.toLowerCase())}
						/>
						<input
							aria-label='Enter full name'
							className='text-sm w-full text-gray bg-gray-background mr-3 py-5 px-4 h-2 border rounded mb-2'
							type='text'
							placeholder='Full name'
							value={fullName}
							onChange={({ target }) => {
								console.log(isInputAlphaBet(target.value));
								if (isInputAlphaBet(target.value)) {
									setfullName(upperCaseFullName(target.value));
								}
							}}
						/>

						<input
							aria-label='Enter your email address'
							className='text-sm w-full text-gray bg-gray-background mr-3 py-5 px-4 h-2 border rounded mb-2'
							type='text'
							placeholder='Email address'
							value={email}
							onChange={({ target }) => setEmail(target.value.toLowerCase())}
						/>
						<input
							aria-label='Enter your password'
							className='text-sm w-full text-gray bg-gray-background mr-3 py-5 px-4 h-2 border rounded mb-2'
							type='password'
							placeholder='Password'
							value={password}
							onChange={({ target }) => setPassword(target.value)}
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
		</section>
	);
}
