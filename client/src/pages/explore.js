import LoggedInUserContext from '../context/logged-in-user';
import { useState, useEffect, useCallback } from 'react';
import Header from '../components/Header';
import { Link, useHistory } from 'react-router-dom';
import useUser from '../hooks/useUser';
import Skeleton from 'react-loading-skeleton';
import FooterNav from '../components/FooterNav';
import { getRecentRandomPhotos } from '../services/firebase';

// Think I can reuse the photo component from the profile page?
import Photos from '../components/Profile/photos';
export default function Explore({ user: loggedInUser }) {
	const { user } = useUser(loggedInUser?.uid);
	const [pagePhotoIds, setPagePhotoIds] = useState([]);
	const [explorePhotos, setExplorePhotos] = useState(null);

	const getExplorePhotos = useCallback(async () => {
		const response = await getRecentRandomPhotos(pagePhotoIds, 2, user?.userId);
		console.log({ response });
		setExplorePhotos(response);
		setPagePhotoIds((prevState) => [
			...prevState,
			...response.map((photo) => photo.docId)
		]);
	}, [user?.userId]);

	useEffect(() => {
		document.title = 'Instagram - Explore';
	}, []);

	useEffect(() => {
		if (user?.userId) getExplorePhotos();
	}, [user, getExplorePhotos, setPagePhotoIds]);
	// Need to call get recent random photos
	// but inside there need to get more user details, namely
	// if the currently logged in user liked the photo, username and
	// profilePic to display in the lightbox

	return (
		<LoggedInUserContext.Provider value={{ user }}>
			<section className='h-full pb-2 mb-10 sm:mb-0 bg-gray-50 px-2 '>
				<Header />
				<div className='mx-auto max-w-screen-lg  h-full'>
					<Photos photos={explorePhotos} />
				</div>
				<FooterNav />
			</section>
		</LoggedInUserContext.Provider>
	);
}
