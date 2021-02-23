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
