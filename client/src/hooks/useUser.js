import { useState, useEffect } from 'react';
import { getUserByUserId } from '../services/firebase';
/* 
  The auth listener is just conerned with if a login or logout happens and
  setting the localStorage items/ triggering a re-render. 
  This is used to pull out the users details FROM OUR FIRESTORE.
  *Remember auth and firestore are two different services; this serves
  as the link between them.
*/
export default function useUser(userId) {
	const [activeUser, setActiveUser] = useState({});
	useEffect(() => {
		async function getUserObjByUserId(userId) {
			// Comes back as array of 1 person; destructure it
			const [user] = await getUserByUserId(userId);
			//in here we need to query for the user data in firestore
			//store details of user in this state
			setActiveUser(user || {});
		}
		//We know if user is truthy they are logged in
		//and check the id just in case b/c {} is also truthy?
		//the udid auth = userID in firestore
		if (userId) {
			getUserObjByUserId(userId);
		}
	}, [userId]);
	return { user: activeUser };
}
