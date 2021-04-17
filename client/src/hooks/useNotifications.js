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
		if (user?.userId) {
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
					setNotifications(notifsArr);
				});
		}
		return () => unsubscribe && unsubscribe();
	}, [user]);
	return { notifications };
};

export default useNotifications;
