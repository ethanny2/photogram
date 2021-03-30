import { useState } from 'react';
import sampleAvatar from '../../images/avatars/raphael.jpg';
import { Link } from 'react-router-dom';
import {
	getUserByUserId,
	updateUserFollowing,
	updateFollowedUserFollowers
} from '../../services/firebase';
/* 
  userDocId- is the docID of the suggested user in this sidebar 
  username - The username of the suggested user to display next to their photo
  profileId - is the userId of the suggested user in this sidebar 
  userId - Logged in users userId in firestore 
*/
export default function SuggestedProfile({
	userDocId,
	username,
	profileId,
	userId
}) {
	const [followed, setFollowed] = useState(false);
	async function handleFollowUser() {
		setFollowed(true);
		// Get logged in users docId
		const [{ docId }] = await getUserByUserId(userId);
		await updateUserFollowing(docId, profileId);
		await updateFollowedUserFollowers(userDocId, userId);
	}
	return !followed ? (
		<div className='flex flex-row items-center align-items justify-between'>
			<div className='flex items-center justify-between'>
				<img
					className='rounded-full w-8 flex mr-3'
					src={sampleAvatar}
					alt={`Follow ${username}`}
				/>
				<Link to={`/p/${username}`}>
					<p className='font-bold'>{username}</p>
				</Link>
			</div>
			<div className='flex'>
				<button
					className='text-sm font-bold text-blue'
					type='button'
					onClick={handleFollowUser}
				>
					Follow
				</button>
			</div>
		</div>
	) : null;
}
