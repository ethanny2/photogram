import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import { getUserByUsername } from '../services/firebase';
import Header from '../components/Header';
import UserProfile from '../components/Profile';
import FooterNav from '../components/FooterNav';
import useUser from '../hooks/useUser';
import UserContext from '../context/user';
import LoggedInUserContext from '../context/logged-in-user';

export default function Profile({ location: state = null }) {
	const { username } = useParams();
	const [user, setUser] = useState(null);
	const [linkedPhotoId, setLinkedPhotoId] = useState(null);
	const history = useHistory();
	const { user: loggedInUser } = useContext(UserContext);
	const { user: loggedInUserFullProfile } = useUser(loggedInUser?.uid);
	// Using state passed through Link component to determine if
	// a specific photo with that docId needs to be clicked to open
	// Using a ref here and listening to changes doesn't work with useEffect
	// instead just use a useCallback passed in as the ref={} prop instead.
	const setRef = useCallback((node) => {
		if (node) {
			console.log('CALLING CLICKED ON THE LINKED PHOTO REF');
			node.click();
		}
	}, []);
	const linkedPostData = {
		linkedPhotoId,
		setRef
	};
	useEffect(() => {
		if (state) {
			setLinkedPhotoId(state.photoId);
		}
	}, [state, user]);

	useEffect(() => {
		async function checkUserExistsToLoadProfile() {
			const [user] = await getUserByUsername(username);
			console.log({ user });
			console.log(user?.userId);
			if (user?.userId) {
				setUser(user);
			} else {
				history.push(ROUTES.NOT_FOUND);
			}
		}
		checkUserExistsToLoadProfile();
	}, [username, history]);

	console.log({ user });

	return user?.username ? (
		<LoggedInUserContext.Provider value={{ user: loggedInUserFullProfile }}>
			<main className='bg-gray w-full h-full mb-20 sm:mb-4'>
				<Header></Header>
				<section className='mx-auto max-w-screen-lg  h-full'>
					<UserProfile user={user} linkedPostData={linkedPostData} />
				</section>
				<FooterNav />
			</main>
		</LoggedInUserContext.Provider>
	) : null;
}
