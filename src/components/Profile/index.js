import React, { useEffect, useReducer, useContext } from 'react';
import Header from './header';
import Photos from './photos';
import { getUserPhotosByUsername } from '../../services/firebase';
import PropTypes from 'prop-types';
import UserContext from '../../context/user';
import useUser from '../../hooks/useUser';
const reducer = (state, newState) => ({ ...state, ...newState });
const initialState = {
	profile: {},
	photosCollection: [],
	followerCount: 0
};

export default function Profile({ user }) {
	/* First thing destructured is our state obj, 2nd is the dispatch function*/
	const [
		{ profile, photosCollection, followerCount },
		profileDispatch
	] = useReducer(reducer, initialState);
	const { user: loggedInUser } = useContext(UserContext);
	const { user: loggedInUserFullProfile } = useUser(loggedInUser?.uid);
	console.log({ loggedInUserFullProfile });
	useEffect(() => {
		/* Think about caching here in localStorage so we can save a network call
    if we already visited this profile before */
		async function getProfileInfoAndPhotos() {
			const photos = await getUserPhotosByUsername(user.username);
			console.log({ photos });
			profileDispatch({
				profile: user,
				//Want username on photos, don't know how they got in the photos on the timeline
				photosCollection: photos?.map((photo) => ({
					...photo,
					username: user.username,
					userLikedPhoto: photo.likes.includes()
				})),
				followerCount: user.followers.length
			});
		}
		if (user.username) {
			getProfileInfoAndPhotos();
		}
	}, [user.username, user]);
	return (
		<>
			<Header
				photosCount={photosCollection ? photosCollection.length : 0}
				profile={profile}
				followerCount={followerCount}
				setFollowerCount={profileDispatch}
				// username={user.username}
				user={loggedInUserFullProfile}
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
