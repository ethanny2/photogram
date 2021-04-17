import { firebase, FieldValue } from '../lib/firebase';
import app from 'firebase/app';
/* Function to reauth/login user to ensure their old password matches */

// Also should delete their photos? Yeah so it doesn't show up on
// the explore page
export async function deleteAccount(currentPassword, userId) {
	try {
		await confirmCurrentPassword(currentPassword);
		const deleteAllSnapshot = await firebase
			.firestore()
			.collection('photos')
			.where('userId', '==', userId)
			.get();

		const userDeleteSnapshot = await firebase
			.firestore()
			.collection('users')
			.where('userId', '==', userId)
			.get();

		// Queue up all the delete operations
		const batch = firebase.firestore().batch();
		deleteAllSnapshot.forEach((doc) => batch.delete(doc.ref));
		userDeleteSnapshot.forEach((doc) => batch.delete(doc.ref));

		// Execute the batch
		await batch.commit();
		const user = firebase.auth().currentUser;
		await user.delete();
	} catch (error) {
		throw Error(error);
	}
}

export async function confirmCurrentPassword(currentPassword) {
	const user = firebase.auth().currentUser;
	if (!user) return;
	const credential = app.auth.EmailAuthProvider.credential(
		user.email,
		currentPassword
	);

	await user.reauthenticateWithCredential(credential);
}

export async function changePassword(currentPassword, newPassword) {
	try {
		await confirmCurrentPassword(currentPassword);
		const user = firebase.auth().currentUser;
		// Not the collection updating the auth account
		await user.updatePassword(newPassword);
	} catch (error) {
		throw Error(error);
	}
}

/* 
	Used on the profile-edit page of the settings to
	update some information on a users profile
	profilePic - string (url to the new image on S3 Bucket)
	fullName - string
	username - string
	bio  - string
	docId - The docId of the logged in user. (Not user Id)
*/

export async function updateProfileByDocId(
	profilePic,
	fullName,
	newUsername,
	bio,
	docId
) {
	// try {
	// 	const updateCommentsSnapShot = await firebase
	// 		.firestore()
	// 		.collection('photos')
	// 		.where('comments', '', receiverId)
	// 		.get();

	// 	// Queue up all the delete operations
	// 	const batch = firebase.firestore().batch();
	// 	deleteAllSnapshot.forEach((doc) => batch.delete(doc.ref));
	// 	// Execute the batch
	// 	await batch.commit();
	// } catch (error) {
	// 	console.error(error.message);
	// }
	console.log({ docId });
	// Before I need to update every comment with the old username
	// also update every notification sent by this user to the new
	// username, change the content link (if it there is not photoId)
	// change the sender profile pic .

	// Also update the photo on the Auth account

	await firebase.auth().currentUser.updateProfile({
		photoURL: profilePic,
		displayName: newUsername
	});

	await firebase.firestore().collection('users').doc(docId).update({
		profilePic,
		fullName,
		username: newUsername,
		bio
	});
}

/*
	Clear a single notification by its document ID.
	notificationDocId - The docId in question; this is called
	after a single notification is clicked.
*/
export async function clearNotificationByDocId(notificationDocId) {
	try {
		await firebase
			.firestore()
			.collection('notifications')
			.doc(notificationDocId)
			.delete();
	} catch (error) {
		console.error(error.message);
	}
}

/* 
	receiverId in the notification table is just
	the userId of who ever's notification it is. 
	receiverId -  (userId of the logged in person)
*/
export async function clearAllNotificationsByUserId(receiverId) {
	try {
		// Cannot use where clause and delete(), either
		// use Promise.all or loop over the query snapshot documents.
		// Batching to improve performance
		const deleteAllSnapshot = await firebase
			.firestore()
			.collection('notifications')
			.where('receiverId', '==', receiverId)
			.get();

		// Queue up all the delete operations
		const batch = firebase.firestore().batch();
		deleteAllSnapshot.forEach((doc) => batch.delete(doc.ref));
		// Execute the batch
		await batch.commit();
	} catch (error) {
		console.error(error.message);
	}
}

/*
		receiverID - Id of user who will get the notification
		senderProfilePic - Url to profile pic of logged in user who triggered notification
		content - Message describing what happened
		username - The logged user who triggered notification
		photoDocId - The post that was liked/commented on to trigger notification
		empty if it was a follow 
		Construct link from p/username/ ... for follows
		and 
		Construct link from p/username/  and also store photoDocId

		if it was  a follow notification photoDocId field is empty
		if it was a comment or like on a photo photoDocId field is filled

*/
export async function createNotification(
	receiverId,
	receiverUsername, // to construct link to content
	senderProfilePic,
	content,
	senderUsername,
	photoDocId = ''
) {
	// If it was a follow link to the following users profile (logged in person)
	// If it was a like/ commment link to the specific post on the senders Page.

	const contentLink = photoDocId
		? `/p/${receiverUsername}`
		: `/p/${senderUsername}`;
	await firebase.firestore().collection('notifications').add({
		dateCreated: Date.now(),
		receiverId,
		senderProfilePic,
		content,
		senderUsername,
		photoDocId,
		contentLink
	});
}

/*
	activeUsername - is the currently logged in users profileId
	profileUserId - is the current persons profile page we visited
*/
export async function isUserFollowingProfile(activeUsername, profileUserId) {
	const result = await firebase
		.firestore()
		.collection('users')
		.where('username', '==', activeUsername) // ethanny2 (active logged in user)
		.where('following', 'array-contains', profileUserId)
		.get();

	const [response = {}] = result.docs.map((item) => ({
		...item.data(),
		docId: item.id
	}));
	/* !! Coerses the value on the right to its boolean equivalent;
	 If reponse.fullName is thruthy return true vice versa */
	return !!response.fullName;
}

export async function toggleFollow(
	isFollowingProfile, //If active user is following this person already
	activeUserDocId, //The active users docId in firestore
	profileDocId, //The docId of the person who is not the logged in user
	profileUserId, //The profileId(called userId in firestore) of the person who is not the logged in user
	followingUserId //The logged in user's userId
) {
	//Updates ME; the logged in user
	await updateUserFollowing(activeUserDocId, profileUserId, isFollowingProfile);
	//Updates the following count of the person the logged in user just followed.
	await updateFollowedUserFollowers(
		profileDocId,
		followingUserId,
		isFollowingProfile
	);
}

/* Adds a new post to the users firestore collection */
export async function addPhoto(caption, userId, imageSrc) {
	try {
		const photoData = {
			caption,
			userId,
			imageSrc,
			likes: [],
			comments: [],
			dateCreated: Date.now()
		};
		await firebase.firestore().collection('photos').add(photoData);
	} catch (error) {
		console.error({ error });
	}
}

// Moved from actions.js now that a double tap can control this
/* 
	userId: the id of logged in user
	docId : the docID of the current post/photo
	userLiked: A boolean indicating if the logged in user liked the photo or not
*/
export const handleToggleLiked = async (userId, docId, userLiked) => {
	/* Swtich the local state for toggle ASYNC DON'T ASSUME ITS DONE*/
	try {
		await firebase
			.firestore()
			.collection('photos')
			.doc(docId)
			.update({
				/* assume toggle liked is the boolean before the state update
				If false add them to likes  
				If true remove them from likes b/c it will update to the opposite*/
				likes: userLiked
					? FieldValue.arrayRemove(userId)
					: FieldValue.arrayUnion(userId)
			});
	} catch (error) {
		console.error({ error });
	}
};
/*Update the 'logged in user's following list; we followed someone new */
export async function updateUserFollowing(
	docId,
	profileId,
	isFollowingProfile
) {
	await firebase
		.firestore()
		.collection('users')
		.doc(docId)
		// We never use that last boolean arg so this is always false
		// If we were already following the user the getSuggestedProfiles(
		// function that returned still data would already filter them out.
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
	await firebase
		.firestore()
		.collection('users')
		.doc(docId)
		.update({
			followers: isFollowingProfile
				? FieldValue.arrayRemove(followingUserId)
				: FieldValue.arrayUnion(followingUserId)
		});
}

export async function doesUsernameExist(username) {
	const result = await firebase
		.firestore()
		.collection('users')
		.where('username', '==', username)
		.get();

	/* Returns an array of documents in collection even if only one matched
    I don't get this... if it fails we return [] but that's still truthy. 
		Ok we just use the length of the array*/
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

/*
  Function used to search for users by name in Firestore.
	keyword : The search term string ; the user name in firestore
	limit : Default 8 results with this matching algo
*/
export async function userSearch(keyword, limit = 8) {
	const { docs } = await firebase
		.firestore()
		.collection('users')
		.orderBy('username')
		.startAt(keyword)
		.endAt(`${keyword}\uf8ff`)
		.limit(limit)
		.get();
	return docs.map((doc) => ({ ...doc.data(), docId: doc.id }));
}

/*
 userID need to check if they liked the photo!
 THIS IS PHOTOS FROM PPL YOU FOLLOW

 Notes:
 Limit to 5-10 photos per user? 
 No I think its fine its still sorted by date so the order 
 of posts should look random. And we only get 10 people so it realistically
 cannot be that many photos.

 Need random people you follow for timeline
 Need to randomize array of photos ? No already sorted by date

 I don't think this will scale? If you reach the bottom of the page we should re-run
 this function for more posts but what guarentees it won't just pull in the same users?
 I need to gather the userIds or docid of all the users who have timeline photos (var userFollowedPhotos)
 aren't repeated. And I need to have infinite scroll + throttle. Also need debounce for the search function.

 */
export async function getUserFollowedPhotos(userId, followingUserIds) {
	const result = await firebase
		.firestore()
		.collection('photos')
		.where('userId', 'in', followingUserIds) //Grabs up to 10 user objects from ur following ID list; 10 random?
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
			return {
				username,
				...photo,
				userLikedPhoto,
				profilePic: user[0].profilePic
			};
		})
	);

	return photosWithUserDetails;
}

/* 
	For the explore page; not really random just gets the X
	most recent photos and then  will jumble the order
	of the returned array. Need local state on the explore page
	holding all the docId of the photos already rendered, I can then
	pass that array in here to ensure there are no repeating photos
	when this function is called again with infinite scroll.

	photoDocIdArr - Array of all current explore photos so none repeat
	limit  - How many photos are brought in on each pull
	userId - The currently logged in users Id

*/
export async function getRecentRandomPhotos(
	photoDocIdArr = [], //Doesn't run if array is empty
	limit = 2,
	userId
) {
	let response;
	if (photoDocIdArr.length > 0) {
		response = await firebase
			.firestore()
			.collection('photos')
			// .orderBy('userId')
			// .orderBy('dateCreated', 'desc')
			.limit(limit)
			.where(app.firestore.FieldPath.documentId(), 'not-in', photoDocIdArr)
			.get();
	} else {
		// Initial no values in array
		response = await firebase
			.firestore()
			.collection('photos')
			.orderBy('dateCreated', 'desc')
			.limit(limit)
			.get();
	}
	const { docs } = response;
	const photos = docs.map((doc) => ({ ...doc.data(), docId: doc.id }));
	const photosWithUserDetails = await Promise.all(
		photos.map(async (photo) => {
			//Check if the photo was liked by the currently logged in user
			let userLikedPhoto = photo.likes.includes(userId);
			//Returns an array
			const user = await getUserByUserId(photo.userId);
			const username = user[0].username;
			return {
				username,
				...photo,
				userLikedPhoto,
				profilePic: user[0].profilePic
			};
		})
	);
	function shuffleArray(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
	}
	shuffleArray(photosWithUserDetails);
	return photosWithUserDetails;
}

export async function getSuggestedProfiles(userId, following) {
	const result = await firebase.firestore().collection('users').limit(10).get();
	// const [{ following }] = await getUserByUserId(userId);

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

export async function getUserByUsername(username) {
	console.log({ username });
	const response = await firebase
		.firestore()
		.collection('users')
		.where('username', '==', username)
		.get();
	return response.docs.map((item) => ({
		...item.data(),
		docId: item.id
	}));

	//Returns array of doc data; if true arr.length > 0
	// return user.length > 0 ? user : false;
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

// Don't we have userID from prop user to Profile/index.js (userProfile)?
// How about only get the first 5 recent photos from this account;
export async function getUserPhotosByUsername(username) {
	const userId = await getUserIdByUsername(username);
	const result = await firebase
		.firestore()
		.collection('photos')
		.where('userId', '==', userId)
		.get();

	console.log({ userId });
	const photos = result.docs.map((item) => ({
		...item.data(),
		docId: item.id
	}));

	return photos;
}