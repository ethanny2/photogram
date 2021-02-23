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
