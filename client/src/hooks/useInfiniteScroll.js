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
		getMorePhotos();
	}, []);

	function checkBottomReached() {
		// 	If lightbox is open don't even check b/c the user
		// cannot scroll
		const isLightBoxOpen = document
			.getElementById('root')
			.classList.contains('lightbox-open');
		console.log({ isLightBoxOpen });
		if (isLightBoxOpen) return;
		const scrollTop =
			(document.documentElement && document.documentElement.scrollTop) ||
			document.body.scrollTop;
		const scrollHeight =
			(document.documentElement && document.documentElement.scrollHeight) ||
			document.body.scrollHeight;
		if (scrollTop + window.innerHeight + 50 >= scrollHeight) {
			console.log('Reached the bottom!');
			setPageBottom(true);
		}
	}
	async function getMorePhotos() {
		//Should also scroll the user down to the position they were at
		if (endOfExplore) return;
		const {
			photosWithUserDetails,
			newLastVisiblePhotoDoc
		} = await getRecentRandomPhotos(lastPhotoDocRef, 10, userId);
		console.log({ photosWithUserDetails });
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

	// On pages with light boxes the #root has a CSS custom property
	// to keep track of where the user scrolled to we can use that value
	// to restore the users position; again only works on pages that render
	// a lightbox

	useEffect(() => {
		console.log('Triggering scroll restore');
		const scrollY = document.documentElement.style.getPropertyValue(
			'--scroll-y'
		);
		console.log({ scrollY });
		let number = scrollY.slice(0, scrollY.length - 2);
		console.log({ number });
		window.scrollTo(0, parseInt(number - 50 || '0'));
	}, [explorePhotos]);

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
		} //Add more photos
	}, [pageBottom]);

	return { explorePhotos, pageBottom, endOfExplore };
}

export default useInfiniteScroll;
