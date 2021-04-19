import firebaseApp from 'firebase/app';
/*Tree shaking */
import 'firebase/firebase-firestore';
import 'firebase/firebase-auth';
// import { seedDatabase } from '../seed';

const {
	REACT_APP_API_KEY,
	REACT_APP_AUTH_DOMAIN,
	REACT_APP_PROJECT_ID,
	REACT_APP_STORAGE_BUCKET,
	REACT_APP_MESSAGING_SENDER_ID,
	REACT_APP_APP_ID,
	REACT_APP_MESUREMENT_ID
} = process.env;

console.log(
	REACT_APP_API_KEY,
	REACT_APP_AUTH_DOMAIN,
	REACT_APP_PROJECT_ID,
	REACT_APP_STORAGE_BUCKET,
	REACT_APP_MESSAGING_SENDER_ID,
	REACT_APP_APP_ID,
	REACT_APP_MESUREMENT_ID
);
const config = {
	apiKey: REACT_APP_API_KEY,
	authDomain: REACT_APP_AUTH_DOMAIN,
	projectId: REACT_APP_PROJECT_ID,
	storageBucket: REACT_APP_STORAGE_BUCKET,
	messagingSenderId: REACT_APP_MESSAGING_SENDER_ID,
	appId: REACT_APP_APP_ID,
	measurementId: REACT_APP_MESUREMENT_ID
};

var firebase = firebaseApp.initializeApp(config);
// Helps us do array operations on our documents easier
//https://firebase.google.com/docs/reference/js/firebase.firestore.FieldValue
const { FieldValue, FieldPath } = firebaseApp.firestore;

// seedDatabase(firebase);

export { firebase, FieldValue, FieldPath };
