import React, { useEffect, useReducer, useContext } from 'react';
import Header from './header';
import Photos from './photos';
import { getUserPhotosByUsername } from '../../services/firebase';
import PropTypes from 'prop-types';
// import UserContext from '../../context/user';
// import useUser from '../../hooks/useUser';
import LoggedInUserContext from '../../context/logged-in-user';
const reducer = (state, newState) => ({ ...state, ...newState });
const initialState = {
	profile: {},
	photosCollection: null,
	followerCount: 0
};

export default function Profile({ user, linkedPostData }) {
	/* First thing destructured is our state obj, 2nd is the dispatch function*/
	const [
		{ profile, photosCollection, followerCount },
		profileDispatch
	] = useReducer(reducer, initialState);
	const { user: loggedInUserFullProfile } = useContext(LoggedInUserContext);
	useEffect(() => {
		async function getProfileInfoAndPhotos() {
			const photos = await getUserPhotosByUsername(user.username);
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
			<Photos photos={photosCollection} linkedPostData={linkedPostData} />
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
