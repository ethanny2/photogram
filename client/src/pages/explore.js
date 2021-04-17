import LoggedInUserContext from '../context/logged-in-user';
import { useState, useEffect, useCallback, useRef } from 'react';
import Header from '../components/Header';
import { Link, useHistory } from 'react-router-dom';
import useUser from '../hooks/useUser';
import Skeleton from 'react-loading-skeleton';
import FooterNav from '../components/FooterNav';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
// Think I can reuse the photo component from the profile page?
import Photos from '../components/Profile/photos';

export default function Explore({ user: loggedInUser }) {
	const { user } = useUser(loggedInUser?.uid);
	const { explorePhotos = null } = useInfiniteScroll(user?.userId);
	useEffect(() => {
		document.title = 'Instagram - Explore';
	}, []);

	return (
		<LoggedInUserContext.Provider value={{ user }}>
			<main className='h-full pb-2 mb-10 sm:mb-0 bg-gray-50 px-2 '>
				<Header />
				<div className='mx-auto max-w-screen-lg  h-full'>
					<Photos photos={explorePhotos} />
				</div>
				<FooterNav />
			</main>
		</LoggedInUserContext.Provider>
	);
}
