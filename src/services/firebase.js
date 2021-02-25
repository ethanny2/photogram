import { firebase, FieldValue } from '../lib/firebase';

export async function doesUsernameExist(username) {
	const result = await firebase
		.firestore()
		.collection('users')
		.where('username', '==', username)
		.get();

	/* Returns an array of documents in collection even if only one matched
    I don't get this... if it fails we return [] but that's still truthy....*/
	return result.docs.map((user) => user.data().length > 0);
}

/* When we create a user account using the auth service we take that uuid and
 put in the user document of the firestore. So the ID for the user in firestore
 and the auth id are the same. JUST ONE USER ID*/
export async function getUserByUserId(userId) {
	const result = await firebase
		.firestore()
		.collection('users')
		.where('userId', '==', userId)
		.get();
	// Only pull out the document ID and the data from the document.
	const user = result.docs.map((item) => ({
		...item.data(),
		docId: item.id
	}));

	return user;
}

/* This doesn't need userID we already have the arr of userIds for the ppl
they follow. THIS IS PHOTOS FROM PPL YOU FOLLOW*/
export async function getUserFollowedPhotos(userId, followingUserIds) {
	const result = await firebase
		.firestore()
		.collection('photos')
		.where('userId', 'in', followingUserIds) //Matches up to 10 ids from the array
		.get();

	const userFollowedPhotos = result.docs.map((item) => ({
		...item.data(),
		docId: item.id
	}));
	/* We want to get the user details for the photos of the ppl we follow*/
	const photosWithUserDetails = await Promise.all(
		userFollowedPhotos.map(async (photo) => {
			//Check if the photo was liked by the currently logged in user
			let userLikedPhoto = photo.likes.includes(userId);
			//Returns an array
			const user = await getUserByUserId(photo.userId);
			const username = user[0].username;
			return { username, ...photo, userLikedPhoto };
		})
	);

	return photosWithUserDetails;
}

/* Get list of followed accounts for current user;*/
export async function getSuggestedProfiles(userId) {
	//get 10 random users
	const result = await firebase.firestore().collection('users').limit(10).get();
	//Map over the result docs and pull out user data, the returned array is filtered
	// and checks if THE LOGGED IN USER (userId) was among those 10 people????
	// Why not just get by id I don't get it
	// This just straight up won't work at scale if its just getting the first 10
	// users and checking if the logged in person is among those documents....

	const [{ following: userFollowing = [] }] = result.docs
		.map((user) => user.data())
		.filter((profile) => profile.userId === userId);

	// Here we map over the 10 random users we got, get the doc data + id,
	// filter it based on if its not the current Logged in Users account
	// and our 'userFollowing' array doesn't already contain them.
	return result.docs
		.map((user) => ({ ...user.data(), docId: user.id }))
		.filter(
			(profile) =>
				profile.userId !== userId && !userFollowing.includes(profile.userId)
		);
}
