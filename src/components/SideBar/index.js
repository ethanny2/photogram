import React from 'react';
import useUser from '../../hooks/useUser';
import User from './User';
import Suggestions from './Suggestions';

export default function Sidebar() {
	/* Gets the user data from fireStore; different obj from useAuthListener user obj*/
	const { user: { userId, username, fullName } = {} } = useUser();

	return (
		<section className="ml-3">
			<User fullName={fullName} username={username} />
			<Suggestions userId={userId} />
		</section>
	);
}
