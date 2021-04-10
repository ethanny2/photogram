import React, { useEffect } from 'react';
import Header from '../components/Header';
import Timeline from '../components/Timeline';
import Sidebar from '../components/SideBar';
import useUser from '../hooks/useUser';
import PropTypes from 'prop-types';
import LoggedInUserContext from '../context/logged-in-user';

/* From useUser; has logged in persons uuid and displayName
prop comes from protected route render function it can pass state to this 
component*/
export default function DashBoard({ user: loggedInUser }) {
	// Gets user details out of firebase; different from userContext (just gets auth account)
	const { user } = useUser(loggedInUser.uid);
	console.log({ user });

	useEffect(() => {
		document.title = 'Instagram';
	}, []);
	return (
		<LoggedInUserContext.Provider value={{ user }}>
			<section className='bg-gray-background'>
				<Header />
				<div className='grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg px-4 lg:px-0'>
					<Timeline />
					<Sidebar />
				</div>
			</section>
		</LoggedInUserContext.Provider>
	);
}

DashBoard.propTypes = {
	user: PropTypes.object.isRequired
};
