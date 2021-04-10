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
	console.log('THIS NEEDS TO MATCH', loggedInUserFullProfile?.userId);
	useEffect(() => {
		/* Think about caching here in localStorage so we can save a network call
    if we already visited this profile before */
		async function getProfileInfoAndPhotos() {
			const photos = await getUserPhotosByUsername(user.username);
			console.log({ photos });
			profileDispatch({
				profile: user,
				// Include some extra fields on the photo which we can do without
				// making an extra firebase call
				photosCollection: photos?.map((photo) => ({
					...photo,
					username: user.username,
					userLiked: photo.likes.includes(loggedInUserFullProfile?.userId),
					profilePic: user.profilePic
				})),
				followerCount: user.followers.length
			});
		}
		if (user.username) {
			getProfileInfoAndPhotos();
		}
	}, [user.username, user, loggedInUserFullProfile?.userId]);
	return (
		<>
			<Header
				photosCount={photosCollection ? photosCollection.length : 0}
				profile={profile}
				followerCount={followerCount}
				setFollowerCount={profileDispatch}
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
