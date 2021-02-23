import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/user';
import { getUserByUserId } from '../services/firebase';
/* 
  The auth listener is just conerned with if a login or logout happens and
  setting the localStorage items/ triggering a re-render. 
  This is used to pull out the users details FROM OUR FIRESTORE.
  *Remember auth and firestore are two different services; this serves
  as the link between them.
*/
export default function useUser() {
	const [activeUser, setActiveUser] = useState({});
	const { user } = useContext(UserContext);
	useEffect(() => {
		async function getUserObjByUserId() {
			const [response] = await getUserByUserId(user.uid);
			//in here we need to query for the user data in firestore
			//store details of user in this state
			setActiveUser({ ...response });
		}
		//We know if user is truthy they are logged in
		//as check the id just in case b/c {} is also truthy?
		//the udid auth = userID in firestore
		if (user && user.uid) {
			getUserObjByUserId();
		}
	}, [user]);
	return { user: activeUser };
}
