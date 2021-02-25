import React, { useEffect, useReducer } from 'react';
import Header from './Header';
import Photos from './Photos';
import {
	getUserByUsername,
	getUserPhotosByUsername
} from '../../services/firebase';

const reducer = (state, newState) => ({ ...state, ...newState });
const initialState = {
	profile: {},
	photosCollection: [],
	followerCount: 0
};

export default function Profile({ username }) {
	/* First thing destructured is our state obj, 2nd is the dispatch function*/
	const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
		reducer,
		initialState
	);
	useEffect(() => {
		/* Think about caching here in localStorage so we can save a network call
    if we already visited this profile before */

		async function getProfileInfoAndPhotos() {
			/* First we destructure the first item from the array
      we know that first item is an object. We can rename that object
      and spread all its properties into a newly named variable. */
			const [{ ...user }] = await getUserByUsername(username);
			console.log({ user });
			const photos = await getUserPhotosByUsername(username);
			console.log({ photos });
			dispatch({
				profile: user,
				photosCollection: photos,
				followerCount: user.followers.length
			});
		}
		getProfileInfoAndPhotos();
	}, [username]);
	return (
		<>
			<Header
				photosCollection={photosCollection.length}
				profile={profile}
				followerCount={followerCount}
				setFollowerCount={dispatch}
			/>
			<Photos photos={photosCollection} />
		</>
	);
}
