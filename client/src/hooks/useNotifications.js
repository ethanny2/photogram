import FirebaseContext from '../context/firebase';
import UserContext from '../context/user';
import { useEffect, useState, useContext } from 'react';

const useNotifications = () => {
	const [notifications, setNotifications] = useState(null);
	const { user } = useContext(UserContext);
	const { firebase } = useContext(FirebaseContext);
	useEffect(() => {
		let unsubscribe = firebase
			.firestore()
			.collection('notifications')
			.where('receiverId', '==', user.uid)
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
		return () => {
			unsubscribe();
		};
	}, [user, firebase]);
	return { notifications };
};

export default useNotifications;
