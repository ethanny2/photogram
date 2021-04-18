import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
	updateUserFollowing,
	updateFollowedUserFollowers,
	createNotification
} from '../../services/firebase';
import LoggedInUserContext from '../../context/logged-in-user';
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
	loggedInUserDocId,
	profilePic
}) {
	const {
		user: { username: loggedInUsername, profilePic: senderProfilePic } = {}
	} = useContext(LoggedInUserContext);
	const [followed, setFollowed] = useState(false);
	async function handleFollowUser() {
		setFollowed(true);
		// No notification for this; logged in users following count is updated
		await updateUserFollowing(loggedInUserDocId, profileId, false);
		await updateFollowedUserFollowers(profileDocId, userId, false);
		// Need a notification to the person you just followed
		const notifContent = `${loggedInUsername} followed you.`;
		await createNotification(
			profileId,
			username,
			senderProfilePic,
			notifContent,
			loggedInUsername
		);
	}
	return !followed ? (
		<div className='flex flex-row items-center align-items justify-between'>
			<div className='flex items-center justify-between'>
				<img
					className='rounded-full h-10 w-10 flex mr-3'
					src={profilePic}
					alt={`Follow ${username}`}
				/>
				<Link to={`/p/${username}`}>
					<p className='font-bold w-24 lg:w-36 whitespace-nowrap overflow-hidden		 overflow-ellipsis	'>
						{username}
					</p>
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
	loggedInUserDocId: PropTypes.string.isRequired,
	profilePic: PropTypes.string.isRequired
};
