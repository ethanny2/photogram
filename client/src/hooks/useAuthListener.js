import { useState, useEffect, useContext } from 'react';
import FirebaseContext from '../context/firebase';

export default function useAuthListener() {
	const [user, setUser] = useState(
		JSON.parse(localStorage.getItem('authUser'))
	);
	const { firebase } = useContext(FirebaseContext);
	/*onAuthStateChanged() returns a function called firebase.Unsubscribe that we can call as
  the clean up function */
	useEffect(() => {
		const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
			if (authUser) {
				localStorage.setItem('authUser', JSON.stringify(authUser));
				setUser(authUser);
			} else {
				//If user logs out
				localStorage.removeItem('authUser');
				setUser(null);
			}
		});
		return () => unsubscribe();
	}, [firebase]);
	return { user };
}
