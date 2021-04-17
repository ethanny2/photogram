import FirebaseContext from '../context/firebase';
// import LoggedInUserContext from '../context/logged-in-user';
import UserContext from '../context/user';
import useUser from '../hooks/useUser';

import { useEffect, useState, useContext } from 'react';
const useNotifications = () => {
	// Don't assume you have a page with a loggedInUserContext you
	// can pull from. B/c the Header is used as the suspense for
	// loading routes it makes more sense to get the data
	// (userId) from the userContext (their auth credentials)
	// and then use the useUser hook to ensure the data is there

	const [notifications, setNotifications] = useState(null);
	const { user: loggedInUser } = useContext(UserContext);
	const { user } = useUser(loggedInUser?.uid);
	const { firebase } = useContext(FirebaseContext);
	// console.log({ user });
	useEffect(() => {
		let unsubscribe;
		// To prevent memory leaks trying to update state when this is unmounted
		// MEMORY LEAK STILL HERE
		// https://stackoverflow.com/questions/56442582/react-hooks-cant-perform-a-react-state-update-on-an-unmounted-component
		let isUnmounted = false;

		if (user?.userId) {
			console.log('SETTING UP FIREBASE NOTIFICATION SNAPSHOT LISTENER');
			unsubscribe = firebase
				.firestore()
				.collection('notifications')
				.where('receiverId', '==', user.userId)
				.orderBy('dateCreated', 'desc')
				.limit(20)
				.onSnapshot((snapshotQuery) => {
					let notifsArr = [];
					snapshotQuery.docs.forEach((item) => {
						notifsArr.push({
							...item.data(),
							docId: item.id
						});
					});
					console.log({ isUnmounted });
					if (!isUnmounted) setNotifications(notifsArr);
				});
		}
		return () => {
			isUnmounted = true;
			unsubscribe && unsubscribe();
		};
	}, [user, firebase]);
	return { notifications };
};

export default useNotifications;
