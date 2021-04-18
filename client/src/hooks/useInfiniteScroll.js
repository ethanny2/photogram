import { throttle } from 'lodash';
import { useEffect, useState } from 'react';
import { getRecentRandomPhotos } from '../services/firebase';

function useInfiniteScroll(userId) {
	const [explorePhotos, setExplorePhotos] = useState(null);
	const [endOfExplore, setEndOfExplore] = useState(false);
	const [pageBottom, setPageBottom] = useState(false);
	// An object representing the raw doucument object from firebase
	// to remember where the cursor was.
	const [lastPhotoDocRef, setLastPhotoDocRef] = useState(null);

	useEffect(() => {
		if (userId) getMorePhotos();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userId]);

	function checkBottomReached() {
		// If lightbox is open don't check if the bottom is reachable
		const isLightBoxOpen = document
			.getElementById('root')
			.classList.contains('lightbox-open');
		if (isLightBoxOpen) return;
		const scrollTop =
			(document.documentElement && document.documentElement.scrollTop) ||
			document.body.scrollTop;
		const scrollHeight =
			(document.documentElement && document.documentElement.scrollHeight) ||
			document.body.scrollHeight;
		if (scrollTop + window.innerHeight + 50 >= scrollHeight) {
			setPageBottom(true);
		}
	}
	async function getMorePhotos() {
		if (endOfExplore) return;
		const {
			photosWithUserDetails,
			newLastVisiblePhotoDoc
		} = await getRecentRandomPhotos(lastPhotoDocRef, 10, userId);
		setPageBottom(false);
		if (photosWithUserDetails.length <= 0) {
			setEndOfExplore(true);
		} else {
			// For first iteration / pull
			if (!explorePhotos) {
				setExplorePhotos(photosWithUserDetails);
			} else {
				setExplorePhotos((prevState) => [
					...prevState,
					...photosWithUserDetails
				]);
			}
			setLastPhotoDocRef(newLastVisiblePhotoDoc);
		}
	}

	useEffect(() => {
		const throttleScrollEvent = throttle(checkBottomReached, 600);
		if (userId) {
			window.addEventListener('scroll', throttleScrollEvent);
		}
		return () => window.removeEventListener('scroll', throttleScrollEvent);
	}, [userId]);

	useEffect(() => {
		if (pageBottom) {
			getMorePhotos();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pageBottom]);

	return { explorePhotos, pageBottom, endOfExplore };
}

export default useInfiniteScroll;
