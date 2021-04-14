import React, { useEffect, useContext } from 'react';
import Header from '../components/Header';
import LoggedInUserContext from '../context/logged-in-user';
import UserContext from '../context/user';
import FooterNav from '../components/FooterNav';
import useUser from '../hooks/useUser';
export default function NotFound() {
	const { user: loggedInUser } = useContext(UserContext);
	const { user } = useUser(loggedInUser?.uid);

	useEffect(() => {
		document.title = 'Page Not Found - Instagram';
	}, []);

	return (
		<LoggedInUserContext.Provider value={{ user }}>
			<section className='bg-gray-background'>
				<Header></Header>
				<div className='mx-auto max-w-screen-lg'>
					<p className='text-2xl text-center font-bold mb-5'>
						{' '}
						Sorry, this page isn't available.
					</p>
					<p className='text-sm text-center'>
						The link you followed may be broken, or the page may have been
						removed. Go back to Instagram.
					</p>
				</div>
				<FooterNav/>
			</section>
		</LoggedInUserContext.Provider>
	);
}
