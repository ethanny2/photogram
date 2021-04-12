import FirebaseContext from '../context/firebase';
import LoggedInUserContext from '../context/logged-in-user';

import { useEffect, useState, useContext } from 'react';
const useNotifications = () => {
	const [notifications, setNotifications] = useState(null);
	const { user } = useContext(LoggedInUserContext);
	const { firebase } = useContext(FirebaseContext);
	console.log({ user });
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

