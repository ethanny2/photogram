import React, { useState, useEffect } from 'react';
import sampleAvatar from '../../images/avatars/orwell.jpg';
import useUser from '../../hooks/useUser';
import Skeleton from 'react-loading-skeleton';
import { toggleFollow, isUserFollowingProfile } from '../../services/firebase';
import PropTypes from 'prop-types';

export default function Header({
	photosCount,
	followerCount: followers,
	setFollowerCount,
	profile: {
		docId: profileDocId,
		userId: profileUserId,
		fullName,
		following = [],
		// followers = [],
		username: profileUsername
	}
}) {
	/* Check if logged in person is following this person; but keep in mind
  not logged in people can see this page as well */
	const [isFollowingProfile, setIsFollowingProfile] = useState(false);
	const { user } = useUser(); //For the logged in person
	//Show button only if there is someone logged in and this is not their page
	const activeBtnFollow = user.username && user.username !== profileUsername;
	console.log({ followers });

	useEffect(() => {
		const isLoggedInUserFollowingProfile = async () => {
			const isFollowing = await isUserFollowingProfile(
				user.username,
				profileUserId
			);
			setIsFollowingProfile(isFollowing);
		};
		if (user.username && profileUserId) {
			isLoggedInUserFollowingProfile();
		}
	}, [user.username, profileUserId]);

	// If logged in user already visited profile don't run This
	// Maybe cache in localstorage
	//Debounce so they cant mash it
	const handleToggleFollow = async () => {
		setIsFollowingProfile((prevState) => !prevState);
		/* 
      Do opposite b/c async set state not changed the variable yet
      If isFollowing profile is truthy it means it going to false so decrement and
      vice-versa
     */
		setFollowerCount({
			followerCount: isFollowingProfile ? followers - 1 : followers + 1
		});
		await toggleFollow(
			isFollowingProfile,
			user.docId,
			profileDocId,
			profileUserId,
			user.userId
		);
	};

	return (
		<header className='grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg'>
			<div className='container flex justify-center'>
				<img
					className='rounded-full h-40 w-40 flex'
					src={sampleAvatar}
					alt={`${profileUsername} profile`}
				/>
			</div>
			<div className='flex items-center justify-center flex-col col-span-2'>
				<div className='container flex items-center'>
					<p className='text-2xl mr-4'>{profileUsername}</p>
					{activeBtnFollow && (
						<button
							className='bg-blue-500 font-bold text-sm rounded text-white w-20 h-8'
							type='button'
							onClick={handleToggleFollow}
						>
							{isFollowingProfile ? 'Unfollow' : 'Follow'}
						</button>
					)}
				</div>
				<div className='container flex mt-4'>
					{followers === undefined || following === undefined ? (
						<Skeleton width={677} height={24} count={1} />
					) : (
						<>
							<p className='mr-10'>
								<span className='font-bold'>{photosCount} photos</span>
							</p>
							<p className='mr-10'>
								<span className='font-bold'>
									{followers} {followers === 1 ? 'follower' : 'followers'}
								</span>
							</p>
							<p className='mr-10'>
								<span className='font-bold'>{following.length} following </span>
							</p>
						</>
					)}
				</div>
				<div className='container flex mt-4'>
					{fullName ? (
						<p className='mr-10'>
							<span className='font-medium'>{fullName} </span>
						</p>
					) : (
						<Skeleton width={677} height={24} count={1} />
					)}
				</div>
			</div>
		</header>
	);
}

Header.propTypes = {
	photosCount: PropTypes.number.isRequired,
	followerCount: PropTypes.number.isRequired,
	setFollowerCount: PropTypes.func.isRequired,
	// username: PropTypes.string.isRequired,
	profile: PropTypes.shape({
		docId: PropTypes.string,
		userId: PropTypes.string,
		fullName: PropTypes.string,
		following: PropTypes.array,
		username: PropTypes.string.isRequired
	}).isRequired
};
