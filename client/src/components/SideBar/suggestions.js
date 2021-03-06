import { memo, useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import SuggestedProfile from './suggestedProfile';
import { getSuggestedProfiles } from '../../services/firebase';
import PropTypes from 'prop-types';

/* 
  Get user id to specifically filter our accounts the 
  logged in user follows. User id may not be ready on first render.
  Need to re-run our useEffect 
*/
const Suggestions = ({ userId, following, loggedInUserDocId }) => {
	const [profiles, setProfiles] = useState(null);
	useEffect(() => {
		async function suggestedProfiles() {
			const response = await getSuggestedProfiles(userId, following);
			setProfiles(response);
		}
		if (userId) {
			suggestedProfiles();
		}
	}, [userId, following]);
	return (
		<div>
			{!profiles ? (
				<Skeleton count={1} height={150} className='mt-5' />
			) : profiles.length > 0 ? (
				<div className='flex flex-col'>
					<div className='flex items-center justify-between mb-2 mt-2'>
						<p className='font-bold text-gray text-sm'>Suggestions for you</p>
					</div>
					<div className='grid mt-4 gap-5'>
						{profiles.map((profile) => (
							<SuggestedProfile
								key={profile.docId}
								profileDocId={profile.docId}
								username={profile.username}
								profileId={profile.userId}
								userId={userId}
								loggedInUserDocId={loggedInUserDocId}
								profilePic={profile.profilePic}
							/>
						))}
					</div>
				</div>
			) : null}
		</div>
	);
};

export default memo(Suggestions);

Suggestions.propTypes = {
	userId: PropTypes.string,
	following: PropTypes.array,
	loggedInUserDocId: PropTypes.string
};
