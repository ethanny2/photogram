import { useState } from 'react';
import sampleAvatar from '../../images/avatars/raphael.jpg';
import { Link } from 'react-router-dom';
import {
	updateUserFollowing,
	updateFollowedUserFollowers
} from '../../services/firebase';
import PropTypes from 'prop-types';
/* 
  userDocId- is the docID of the suggested user in this sidebar 
  username - The username of the suggested user to display next to their photo
  profileId - is the userId of the suggested user in this sidebar 
  userId - Logged in users userId in firestore 
	loggedInUserDocId - logged in users docID 
*/
export default function SuggestedProfile({
	profileDocId,
	username,
	profileId,
	userId,
	loggedInUserDocId
}) {
	const [followed, setFollowed] = useState(false);
	async function handleFollowUser() {
		setFollowed(true);
		// Get logged in users docId
		// const [{ docId }] = await getUserByUserId(userId);
		await updateUserFollowing(loggedInUserDocId, profileId, false);
		await updateFollowedUserFollowers(profileDocId, userId, false);
	}
	console.log('followed in suggestedProfile', followed);
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
					title='Follow'
				>
					Follow
				</button>
			</div>
		</div>
	) : null;
}

SuggestedProfile.propTypes = {
	profileDocId: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired,
	profileId: PropTypes.string.isRequired,
	userId: PropTypes.string.isRequired,
	loggedInUserDocId: PropTypes.string.isRequired
};
