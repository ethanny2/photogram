import LoggedInUserContext from '../context/logged-in-user';
import { useEffect } from 'react';
import Header from '../components/Header';
import useUser from '../hooks/useUser';
import Skeleton from 'react-loading-skeleton';
import FooterNav from '../components/FooterNav';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
// Think I can reuse the photo component from the profile page?
import Photos from '../components/Profile/photos';

export default function Explore({ user: loggedInUser }) {
	const { user } = useUser(loggedInUser?.uid);
	const {
		explorePhotos = null,
		pageBottom = false,
		endOfExplore = false
	} = useInfiniteScroll(user?.userId);
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
				{pageBottom && !endOfExplore ? (
					<div className='fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center'>
						<div className='animate-loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4'></div>
					</div>
				) : null}

				<FooterNav />
			</main>
		</LoggedInUserContext.Provider>
	);
}
