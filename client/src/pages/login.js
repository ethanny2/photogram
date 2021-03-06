import React, { useEffect, useState, useContext } from 'react';
import phoneImg from '../images/iphone-with-profile.jpg';
import logo from '../images/photogram-logo.png';
import * as ROUTES from '../constants/routes';
import { Link, useHistory } from 'react-router-dom';
import { validateEmail } from '../utils';
import firebaseContext from '../context/firebase';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const { firebase } = useContext(firebaseContext);
	const history = useHistory();
	const isInvalid =
		password === '' || email === '';

	const handleLogin = async (e) => {
		e.preventDefault();
		if(validateEmail(email) === false) {
			setError('Please enter a real email address');
			return;
		}
		try {
			await firebase.auth().signInWithEmailAndPassword(email, password);
			history.push(ROUTES.DASHBOARD);
		} catch (error) {
			setEmail('');
			setPassword('');
			setError(error.message);
		}
	};

	useEffect(() => {
		//Set document title for better SEO on each page
		document.title = 'Login • Photogram';
	}, []);
	return (
		<main className=' bg-gray-50 flex flex-col lg:flex-row justify-center w-screen  items-center h-screen px-4 lg:px-0'>
			<div className='hidden lg:flex w-5/5 lg:w-2/5 justify-end lg:h-full '>
				<img
					src={phoneImg}
					alt='iPhone with Instagram app'
					className='object-scale-down w-full'
				/>
			</div>
			{/* Div to align right side modals */}
			<div className=' flex flex-col w-full  justify-center items-start h-screen max-w-sm  lg:mx-2  '>
				{/* Div to group form and logo */}
				<div className='flex flex-col items-center bg-white p-4 border mb-4 lg:w-4/5'>
					<h1 className='flex justify-center w-4/5 lg:w-full'>
						<img src={logo} alt='Instagram' className='mt-2 w-6/12 mb-4' />
					</h1>
					{error && (
						<p data-testid='error' className='mb-4 text-xs text-red-500'>
							{error}
						</p>
					)}
					<form data-testid='login' onSubmit={handleLogin} autoComplete='off'>
						<input
							aria-label='Enter your email address'
							className='text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2'
							type='text'
							placeholder='Email address'
							value={email}
							onChange={({ target }) => setEmail(target.value.toLowerCase())}
						/>
						<input
							aria-label='Enter your password'
							className='text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2'
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
							Login
						</button>
					</form>
				</div>
				{/* Div for the sign up portion separated */}
				<div className='flex justify-center items-center flex-col w-full bg-white p-4 border lg:w-4/5'>
					<p className='text-sm'>
						Don't have an account?{' '}
						<Link
							to={ROUTES.SIGN_UP}
							className='font-bold text-blue-500'
							data-testid='sign-up'
						>
							Sign up
						</Link>
					</p>
				</div>
			</div>
		</main>
	);
}
