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

export async function getSuggestedProfiles(userId) {
	const result = await firebase.firestore().collection('users').limit(10).get();
	const [{ following }] = await getUserByUserId(userId);

	//Map to get the document data of 10 random users
	// filter out any user that is
	// a) the currenly logged in users id
	// b) if we already follow that account
	return result.docs
		.map((user) => ({ ...user.data(), docId: user.id }))
		.filter(
			(profile) =>
				profile.userId !== userId && !following.includes(profile.userId)
		);
}

/*Update the 'logged in user's following list; we followed someone new */
export async function updateUserFollowing(
	docId,
	profileId,
	isFollowingProfile
) {
	const response = await firebase
		.firestore()
		.collection('users')
		.doc(docId)
		.update({
			following: isFollowingProfile
				? FieldValue.arrayRemove(profileId)
				: FieldValue.arrayUnion(profileId)
		});
}

/*Update the followed list of the person the logged in user (docId) just followed */
export async function updateFollowedUserFollowers(
	docId, //The user whose follwers we wish to update
	followingUserId, //logged in user
	isFollowingProfile
) {
	const response = await firebase
		.firestore()
		.collection('users')
		.doc(docId)
		.update({
			following: isFollowingProfile
				? FieldValue.arrayRemove(followingUserId)
				: FieldValue.arrayUnion(followingUserId)
		});
}

export async function getUserByUsername(username) {
	const response = await firebase
		.firestore()
		.collection('users')
		.where('username', '==', username)
		.get();
	const user = response.docs.map((item) => ({
		...item.data(),
		docId: item.id
	}));

	//Returns array of doc data; if true arr.length > 0
	return user.length > 0 ? user : false;
}

export async function getUserIdByUsername(username) {
	const result = await firebase
		.firestore()
		.collection('users')
		.where('username', '==', username)
		.get();

	const [{ userId = null }] = result.docs.map((item) => ({
		...item.data()
	}));
	return userId;
}

export async function getUserPhotosByUsername(username) {
	const userId = await getUserIdByUsername(username);
	const result = await firebase
		.firestore()
		.collection('photos')
		.where('userId', '==', userId)
		.get();

		console.log({userId});
	const photos = result.docs.map((item) => ({
		...item.data(),
		docId: item.id
	}));

	return photos;
}

/* Get list of followed accounts for current user;
Yep... next lesson he literally addresses all of this...
*/
// export async function getSuggestedProfiles(userId) {
// 	//get 10 random users
// 	const result = await firebase.firestore().collection('users').limit(10).get();
// 	//Map over the result docs and pull out user data, the returned array is filtered
// 	// and checks if THE LOGGED IN USER (userId) was among those 10 people????
// 	// Why not just get by id I don't get it
// 	// This just straight up won't work at scale if its just getting the first 10
// 	// users and checking if the logged in person is among those documents....

// 	const [{ following: userFollowing = [] }] = result.docs
// 		.map((user) => user.data())
// 		.filter((profile) => profile.userId === userId);

// 	// Here we map over the 10 random users we got, get the doc data + id,
// 	// filter it based on if its not the current Logged in Users account
// 	// and our 'userFollowing' array doesn't already contain them.
// 	return result.docs
// 		.map((user) => ({ ...user.data(), docId: user.id }))
// 		.filter(
// 			(profile) =>
// 				profile.userId !== userId && !userFollowing.includes(profile.userId)
// 		);
// }
