import React, { useEffect } from 'react';
import Header from '../components/Header';
import Timeline from '../components/Timeline';
import Sidebar from '../components/SideBar';
import useUser from '../hooks/useUser';
import PropTypes from 'prop-types';
import LoggedInUserContext from '../context/logged-in-user';
import FooterNav from '../components/FooterNav';
/* From useUser; has logged in persons uuid and displayName
prop comes from protected route render function it can pass state to this 
component*/
export default function DashBoard({ user: loggedInUser }) {
	// Gets user details out of firebase; different from userContext (just gets auth account)
	const { user } = useUser(loggedInUser.uid);

	useEffect(() => {
		document.title = 'Photogram';
	}, []);
	return (
		<LoggedInUserContext.Provider value={{ user }}>
			<main className='bg-gray-50'>
				<Header />
				<div className='grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg px-4 '>
					<Timeline />
					<Sidebar />
				</div>
			</main>
			<FooterNav />
		</LoggedInUserContext.Provider>
	);
}

DashBoard.propTypes = {
	user: PropTypes.object.isRequired
};
