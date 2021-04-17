import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import FirebaseContext from '../context/firebase';
import UserContext from '../context/user';
import logo from '../images/logo.png';
import SearchBar from './SearchBar';
import Notifications from '../components/Notifications';

export default function Header() {
	const { firebase } = useContext(FirebaseContext);
	const { user } = useContext(UserContext);
	const history = useHistory();
	return (
		<header className='z-40 sticky top-0 left-0  w-full h-16 bg-white border-b border-gray-primary mb-8 px-2 lg:px-0'>
			<nav className='container mx-auto max-width-lg h-full' role='navigation'>
				<ul className='flex justify-evenly items-center h-full'>
					<li
						style={{ maxWidth: '5rem' }}
						className=' max-w-sm text-gray-700 text-center flex items-center items-center cursor-pointer'
					>
						<h1>
							<Link to={ROUTES.DASHBOARD} aria-label='Dashboard'>
								<img className='w-full mt-2' src={logo} alt='Instagram logo' />
							</Link>
						</h1>
					</li>
					<li className='text-gray-700 text-center flex items-center items-center'></li>
					{user?.email ? (
						<li className='text-gray-700 text-center flex items-center items-center'>
							<SearchBar />
						</li>
					) : null}

					<li className='text-gray-700 text-center flex items-center items-center justify-self-end cursor-pointer p-2'>
						{user?.email ? (
							<>
								<Link to={ROUTES.DASHBOARD} arial-label='Home'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
										stroke='currentColor'
										className='w-8 mr-2 text-black-light cursor-pointer hidden sm:block'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
										/>
									</svg>
								</Link>
								<Link to={ROUTES.NEW_POST} arial-label='Upload'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='w-8 hidden sm:block mr-2 text-black-light cursor-pointer'
										fill='none'
										viewBox='0 0 24 24'
										stroke='currentColor'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
										/>
									</svg>
								</Link>
								<Link to={ROUTES.EXPLORE} arial-label='Explore'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='w-8 hidden sm:block mr-2 text-black-light cursor-pointer'
										fill='none'
										viewBox='0 0 24 24'
										stroke='currentColor'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9'
										/>
									</svg>
								</Link>
								<Notifications />

								<Link to={ROUTES.PROFILE_SETTINGS} arial-label='Settings'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='w-8 hidden sm:block mr-2 text-black-light cursor-pointer'
										fill='none'
										viewBox='0 0 24 24'
										stroke='currentColor'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
										/>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
										/>
									</svg>
								</Link>
								<button
									type='button'
									title='Sign Out'
									className='font-bold hidden sm:block'
									onClick={() => {
										firebase.auth().signOut();
										history.push(ROUTES.LOGIN);
									}}
									onKeyDown={({ key }) => {
										if (key === 'Enter') firebase.auth().signOut();
									}}
								>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
										stroke='currentColor'
										className='w-8 mr-3 text-black-light cursor-pointer'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
										/>
									</svg>
								</button>
								<div className='flex items-center cursor-pointer lg:mx-2'>
									{user?.photoURL ? (
										<Link to={`/p/${user?.username}`}>
											<img
												className='ml-2 xs2:w-10 xs2:h-10 w-12 h-9 md:w-10 lg:w-12 rounded-full md:h-10 lg:h-12 flex'
												src={user.photoURL}
												alt={`${user.displayName} profile`}
											/>
										</Link>
									) : (
										<p>Loading...</p>
									)}
								</div>
							</>
						) : (
							<>
								<Link to={ROUTES.LOGIN}>
									<button
										type='button'
										className='bg-blue-500 font-bold text-sm rounded text-white w-20 h-8'
									>
										Log In
									</button>
								</Link>
								<Link to={ROUTES.SIGN_UP}>
									<button
										type='button'
										className='font-bold text-sm rounded text-blue w-20 h-8'
									>
										Sign Up
									</button>
								</Link>
							</>
						)}
					</li>
				</ul>
			</nav>
		</header>
	);
}
