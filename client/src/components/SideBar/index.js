import { useContext } from 'react';
import User from './user';
import Suggestions from './suggestions';
import LoggedInUserContext from '../../context/logged-in-user';

export default function Sidebar() {
	/* Gets the user data from fireStore; different obj from useAuthListener user obj*/
	const {
		user: { docId = '', fullName, username, userId, following } = {}
	} = useContext(LoggedInUserContext);
	console.log({ userId });
	return (
		<section className='ml-3 p-4 hidden md:block'>
			<User fullName={fullName} username={username} />
			<Suggestions
				userId={userId}
				following={following}
				loggedInUserDocId={docId}
			/>
		</section>
	);
}
