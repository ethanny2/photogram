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
		if(user?.username) document.title = `${user.fullName} (@${user.username}) • Photogram Profile`;
	}, [user])

	useEffect(() => {
		async function checkUserExistsToLoadProfile() {
			const [user] = await getUserByUsername(username);
			if (user?.userId) {
				setUser(user);
			} else {
				history.push(ROUTES.NOT_FOUND);
			}
		}
		checkUserExistsToLoadProfile();
	}, [username, history]);

	return user?.username ? (
		<LoggedInUserContext.Provider value={{ user: loggedInUserFullProfile }}>
			<section className='bg-gray-50 pb-2 w-full h-full mb-4 sm:mb-0'>
				<Header></Header>
				<div className='mx-auto max-w-screen-lg  h-full'>
					<UserProfile user={user} linkedPostData={linkedPostData} />
				</div>
				<FooterNav />
			</section>
		</LoggedInUserContext.Provider>
	) : null;
}
