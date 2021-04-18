import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import {
	toggleFollow,
	isUserFollowingProfile,
	createNotification
} from '../../services/firebase';
import PropTypes from 'prop-types';

export default function Header({
	photosCount,
	followerCount,
	setFollowerCount,
	profile: {
		docId: profileDocId,
		userId: profileUserId,
		fullName,
		following,
		followers,
		username: profileUsername = '',
		profilePic,
		bio
	},
	user
}) {
	/* Check if logged in person is following this person; but keep in mind
  not logged in people can see this page as well */
	const [isFollowingProfile, setIsFollowingProfile] = useState(false);
	//Show button only if there is someone logged in and this is not their page
	const activeBtnFollow =
		user && user.username && user.username !== profileUsername;
	useEffect(() => {
		const isLoggedInUserFollowingProfile = async () => {
			// Returns boolean
			const isFollowing = await isUserFollowingProfile(
				user.username,
				profileUserId
			);
			setIsFollowingProfile(isFollowing);
		};
		if (user.username && profileUserId) {
			isLoggedInUserFollowingProfile();
		}
	}, [user?.username, profileUserId]);

	const handleToggleFollow = async () => {
		const newFollowingState = !isFollowingProfile;
		setIsFollowingProfile((prevState) => !prevState);
		/* 
      Do opposite b/c async set state not changed the variable yet
      If isFollowing profile is truthy it means it going to false so decrement and
      vice-versa
     */
		setFollowerCount({
			followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1
		});
		await toggleFollow(
			isFollowingProfile,
			user.docId,
			profileDocId,
			profileUserId,
			user.userId
		);
		// Create notification only if you followed someone not unfollowed
		if (newFollowingState) {
			const notifContent = `${user.username} followed you.`;
			await createNotification(
				profileUserId,
				profileUsername,
				user.profilePic,
				notifContent,
				user.username
			);
		}
	};
	return (
		<header className='grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg'>
			<div className='col-span-1 container flex justify-center items-center'>
				{profileUsername ? (
					<img
						className='rounded-full h-20 w-20 lg:h-40 md:w-20 lg:w-40 flex'
						src={profilePic}
						alt={`${profileUsername} profile`}
					/>
				) : (
					<p> Loading...</p>
				)}
			</div>
			<div className=' text-left w-full flex items-center justify-center flex-col col-span-2'>
				<div className='container flex items-center justify-start'>
					<p className='text-2xl text-left mr-4'>{profileUsername}</p>
					{activeBtnFollow && (
						<button
							className='bg-blue-500 font-bold text-sm rounded text-white w-20 h-7'
							type='button'
							onClick={handleToggleFollow}
							onKeyDown={({ key }) => {
								if (key === 'Enter') handleToggleFollow();
							}}
						>
							{isFollowingProfile ? 'Unfollow' : 'Follow'}
						</button>
					)}
				</div>
				<div className='container flex mt-4 flex-col lg:flex-row'>
					{followers === undefined || following === undefined ? (
						<Skeleton height={100} width={200} count={1} />
					) : (
						<>
							<p className='mr-10'>
								<span className='font-bold'>{photosCount} photos</span>
							</p>
							<p className='mr-10'>
								<span className='font-bold'>
									{followerCount}{' '}
									{followerCount === 1 ? 'follower' : 'followers'}
								</span>
							</p>
							<p className='mr-10'>
								<span className='font-bold'>{following.length} following</span>
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
						<Skeleton height={24} count={1} />
					)}
				</div>
				{bio ? (
					<div className='container flex mt-4'>
						<p className='mr-10'>
							<span className='font-medium'>{bio} </span>
						</p>
					</div>
				) : null}
			</div>
		</header>
	);
}

Header.propTypes = {
	photosCount: PropTypes.number.isRequired,
	followerCount: PropTypes.number.isRequired,
	setFollowerCount: PropTypes.func.isRequired,
	profile: PropTypes.shape({
		docId: PropTypes.string,
		userId: PropTypes.string,
		fullName: PropTypes.string,
		following: PropTypes.array,
		username: PropTypes.string
	}).isRequired
};
