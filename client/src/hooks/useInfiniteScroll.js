import { throttle } from 'lodash';
import { useEffect, useState, useCallback } from 'react';
import { getRecentRandomPhotos } from '../services/firebase';

function useInfiniteScroll(userId) {
	const [explorePhotos, setExplorePhotos] = useState([]);
	const [endOfExplore, setEndOfExplore] = useState(false);
	const [pageBottom, setPageBottom] = useState(false);

	console.log({ endOfExplore });
	console.log({ explorePhotos });

	useEffect(() => {
		getMorePhotos();
	}, []);

	function checkBottomReached() {
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
		const ids = explorePhotos.map((photo) => photo.docId);
		const response = await getRecentRandomPhotos(ids, 2, userId);
		console.log({ response });
		setPageBottom(false);
		if (response.length <= 0) {
			setEndOfExplore(true);
		} else {
			setExplorePhotos((prevState) => [...prevState, ...response]);
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
		window.scrollTo(0, parseInt(number || '0'));
	}, [explorePhotos]);

	// When the user first gets on the page

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

	// const fetchNewPhotos = useCallback(async function (photoIds, userId) {
	// 	console.log('Inside useCallback version of fetchNewPhotos', {
	// 		photoIds
	// 	});
	// 	const response = await getRecentRandomPhotos(photoIds, 2, userId);
	// 	console.log({ response });
	// 	if (response.length <= 0) {
	// 		setEndOfExplore(true);
	// 	} else {
	// 		setExplorePhotos((prevState) => [...prevState, ...response]);
	// 	}
	// }, []);

	// useEffect(() => {
	// 	if (userId)
	// 		fetchNewPhotos(
	// 			explorePhotos.map((photo) => photo.docId),
	// 			userId
	// 		);
	// }, [userId, fetchNewPhotos]);

	// useEffect(() => {
	// 	async function checkBottomReached() {
	// 		console.log('Scolled!!!');
	// 		if (
	// 			window.innerHeight + window.scrollY >= document.body.offsetHeight &&
	// 			endOfExplore === false
	// 		) {
	// 			console.log("you're at the bottom of the page");
	// 			const pagePhotoIds = explorePhotos.map((photo) => photo.docId);
	// 			console.log({ pagePhotoIds });
	// 			fetchNewPhotos(pagePhotoIds, userId);
	// 		}
	// 	}
	// 	const throttleScrollEvent = throttle(checkBottomReached, 600);
	// 	if (userId) {
	// 		window.addEventListener('scroll', throttleScrollEvent);
	// 	}
	// 	return () => window.removeEventListener('scroll', throttleScrollEvent);
	// }, [userId, fetchNewPhotos]);
	return { explorePhotos };
	//Return some local state
}

export default useInfiniteScroll;
