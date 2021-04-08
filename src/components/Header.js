import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import FirebaseContext from '../context/firebase';
import UserContext from '../context/user';
import logo from '../images/logo.png';
import useUser from '../hooks/useUser';
import daliAvatar from '../images/avatars/dali.jpg';
import { useHistory } from 'react-router-dom';
import SearchBar from './SearchBar';

export default function Header() {
	const { firebase } = useContext(FirebaseContext);
	const { user: loggedInUser } = useContext(UserContext);
	const { user } = useUser(loggedInUser?.uid);
	const history = useHistory();
	return (
		<header className='h-16 bg-white border-b border-gray-primary mb-8 px-4 lg:px-0'>
			<nav className='container mx-auto max-width-lg h-full' role='navigation'>
				<ul className='flex justify-between h-full'>
					<li className='text-gray-700 text-center flex items-center items-center cursor-pointer'>
						<h1>
							<Link to={ROUTES.DASHBOARD} aria-label='Dashboard'>
								<img className='w-1/2 mt-2 ' src={logo} alt='Instagram logo' />
							</Link>
						</h1>
					</li>
					<li className='text-gray-700 text-center flex items-center items-center'>
						<SearchBar />
					</li>
					<li className='text-gray-700 text-center flex items-center items-center justify-self-end cursor-pointer p-2'>
						{user?.username ? (
							<>
								<Link to={ROUTES.DASHBOARD} arial-label='Home'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
										stroke='currentColor'
										className='w-8 mr-6 text-black-light cursor-pointer'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
										/>
									</svg>
								</Link>
								<button
									type='button'
									title='Sign Out'
									className='font-bold'
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
										className='w-8 mr-6 text-black-light cursor-pointer'
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
									{user?.username ? (
										<Link to={`/p/${user?.username}`}>
											<img
												className=' w-28 h-8 md:w-10 lg:w-12 rounded-full md:h-8 lg:h-12 flex'
												src={daliAvatar}
												alt={`${user.username} profile`}
											/>
										</Link>
									) : null}
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
