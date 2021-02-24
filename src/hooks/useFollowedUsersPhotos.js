import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/user';
import { getUserByUserId, getUserFollowedPhotos } from '../services/firebase';

export default function useFollowedUsersPhotos() {
	const [photos, setPhotos] = useState(null);
	const {
		user: { uid: userId = '' }
	} = useContext(UserContext);
	useEffect(() => {
		async function getTimelinePhotos() {
			const followingUserIds = await getUserByUserId(userId);
			//If the user object comes back good and they follow at least 1 person
			// Always comes back in array even if only one doc
			if (followingUserIds && followingUserIds[0].following.length > 0) {
				let followedUserPhotos = await getUserFollowedPhotos(
					userId,
					followingUserIds[0].following
				);
				//Recent first;
				followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
				console.log({ followedUserPhotos });
				setPhotos(followedUserPhotos);
			}
		}
		//Default is empty string; falsey value
		if (userId) {
			getTimelinePhotos();
		}
	}, [userId]);
  console.log({photos});
	return { photos };
}
