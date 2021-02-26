import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import { getUserByUsername } from '../services/firebase';
import Header from '../components/Header';
import UserProfile from '../components/Profile';

export default function Profile() {
	const { username } = useParams();
	const [userExists, setUserExists] = useState(undefined);
	const history = useHistory();
	useEffect(() => {
		async function checkUserExistsToLoadProfile() {
			const doesUserExist = await getUserByUsername(username);
			if (!doesUserExist) {
				history.push(ROUTES.NOT_FOUND);
			} else {
				setUserExists(true);
			}
		}
		checkUserExistsToLoadProfile();
	}, [username, history]);
	return userExists ? (
		<main className='bg-gray'>
			<Header></Header>
			<section className='mx-auto max-w-screen-lg'>
				<UserProfile username={username} />
			</section>
		</main>
	) : null;
}
