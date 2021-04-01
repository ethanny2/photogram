import React, { useEffect, useReducer } from 'react';
import Header from './Header';
import Photos from './Photos';
import {
	getUserPhotosByUsername
} from '../../services/firebase';
import PropTypes from 'prop-types';

const reducer = (state, newState) => ({ ...state, ...newState });
const initialState = {
	profile: {},
	photosCollection: null,
	followerCount: 0
};

export default function Profile({ user }) {
	/* First thing destructured is our state obj, 2nd is the dispatch function*/
	const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
		reducer,
		initialState
	);
	useEffect(() => {
		/* Think about caching here in localStorage so we can save a network call
    if we already visited this profile before */
		async function getProfileInfoAndPhotos() {
			const photos = await getUserPhotosByUsername(user.username);
			console.log({ photos });
			dispatch({
				profile: user,
				photosCollection: photos,
				followerCount: user.followers.length
			});
		}
		if (user.username) {
			getProfileInfoAndPhotos();
		}
	}, [user.username]);
	return (
		<>
			<Header
				photosCount={photosCollection ? photosCollection.length : 0}
				profile={profile}
				followerCount={followerCount}
				setFollowerCount={dispatch}
				// username={user.username}
			/>
			<Photos photos={photosCollection} />
		</>
	);
}

Profile.propTypes = {
	user: PropTypes.shape({
		dateCreated: PropTypes.number.isRequired,
		emailAddress: PropTypes.string.isRequired,
		followers: PropTypes.array.isRequired,
		following: PropTypes.array.isRequired,
		fullName: PropTypes.string.isRequired,
		userId: PropTypes.string.isRequired,
		username: PropTypes.string.isRequired
	}).isRequired
};
