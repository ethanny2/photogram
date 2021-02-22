import React from 'react';
import phoneImg from '../images/iphone-with-profile.jpg';
import logo from '../images/logo.png';
import * as ROUTES from '../constants/routes';

import { Link } from 'react-router-dom';

export default function Login() {
	return (
		<section className='container flex mx-auto max-w-screen-md items-center h-screen'>
			<div className='flex w-3/5'>
				<img src={phoneImg} alt='iPhone with Instagram app' />
			</div>
			{/* Div to align right side modals */}
			<div className='flex flex-col w-2/5'>
				{/* Div to group form and logo */}
				<div className='flex flex-col items-center bg-white p-4 border mb-4'>
					<h1 className='flex justify-center w-full'>
						<img src={logo} alt='Instagram' className='mt-2 w-6/12 mb-4' />
					</h1>
					<form method='POST'>
						<input
							aria-label='Enter your email address'
							className='text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2'
							type='text'
							placeholder='Email address'
						/>
						<input
							aria-label='Enter your password'
							className='text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2'
							type='password'
							placeholder='Password'
						/>
						<button
							type='submit'
							className={`bg-blue-500 text-white w-full rounded h-8 font-bold`}
						>
							Log In
						</button>
					</form>
				</div>
				{/* Div for the sign up portion separated */}
				<div className='flex justify-center items-center flex-col w-full bg-white p-4 border'>
					<p className='text-sm'>
						Don't have an account?{' '}
						<Link to={ROUTES.SIGN_UP} className='font-bold'>
							Sign up
						</Link>
					</p>
				</div>
			</div>
		</section>
	);
}
