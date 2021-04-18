import { useState, useEffect } from 'react';
import { getUserFollowedPhotos } from '../services/firebase';

export default function useFollowedUsersPhotos(user) {
	const [photos, setPhotos] = useState(null);

	useEffect(() => {
		async function getTimelinePhotos() {
			if (user?.following?.length > 0) {
				let followedUserPhotos = await getUserFollowedPhotos(
					user.userId,
					user.following //Arr of ppl logged in person follows
				);
				//Recent first;
				followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
				setPhotos(followedUserPhotos);
			} else {
				// To stop the skelton loading
				setPhotos([]);
			}
		}
		//Default is empty string; falsey value
		if (user?.userId) {
			getTimelinePhotos();
		}
	}, [user?.userId, user?.following]);
	return { photos };
}
