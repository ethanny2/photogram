import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import FirebaseContext from '../context/firebase';
import logo from '../images/logo.png';
import daliAvatar from '../images/avatars/dali.jpg';

export default function Header() {
	const { firebase } = useContext(FirebaseContext);
	// const user = null;
	const user = { displayName: 'dali' };
	return (
		<header className='bg-white w-full border-b mb-8 h-16'>
			<nav className='container mx-auto max-width-lg h-full' role='navigation'>
				<ul className='flex justify-between h-full'>
					<li className='text-gray-700 text-center flex items-center items-center cursor-pointer'>
						<h1>
							<Link to={ROUTES.DASHBOARD} aria-label='Dashboard'>
								<img className='w-1/2 mt-2 ' src={logo} alt='Instagram logo' />
							</Link>
						</h1>
					</li>
					<li className='text-gray-700 text-center flex items-center items-center justify-self-end cursor-pointer p-2'>
						{user ? (
							<>
								<Link to={ROUTES.DASHBOARD} arial-label='Home'>
									<p className='mx-2'>Dashboard</p>
								</Link>
								<button
									type='button'
									className='font-bold'
									onClick={() => firebase.auth().signOut()}
									onKeyDown={({ key }) => {
										if (key === 'Enter') firebase.auth().signOut();
									}}
								>
									Sign Out
								</button>
								<div className='flex items-center cursor-pointer mx-2'>
									<Link to={`/p/${user.displayName}`}>
										<img
											className='w-12 rounded-full h-12 flex'
											src={daliAvatar}
											alt='Dali'
										/>
									</Link>
								</div>
							</>
						) : (
							<>
								<Link to={ROUTES.LOGIN}>
									<button
										type='button'
										className='bg-blue-500 font-bold text-sm rounded text-white w-20 h-8'
									>
										Login
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
