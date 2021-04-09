import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import { getUserByUsername } from '../services/firebase';
import Header from '../components/Header';
import UserProfile from '../components/Profile';

export default function Profile() {
	const { username } = useParams();
	const [user, setUser] = useState(null);
	const history = useHistory();
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
		<main className='bg-gray'>
			<Header></Header>
			<section className='mx-auto max-w-screen-lg'>
				<UserProfile user={user} />
			</section>
		</main>
	) : null;
}
