import { useState } from 'react';
import sampleAvatar from '../../images/avatars/raphael.jpg';
import { Link } from 'react-router-dom';
/* 
  userDocId- is the docID of the suggested user in this sidebar 
  username - The username of the suggested user to display next to their photo
  profileId - The docId of the currently logged in user so we can add the suggestions to our follow list
  userId - Our userId in firestore for adding us to the selected users 'following' list
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
