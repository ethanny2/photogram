import { useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import useDoubleTap from '../../hooks/useDoubleTap';
import LightBoxContext from '../../context/lightbox';
import UserContext from '../../context/user';
import { handleToggleLiked } from '../../services/firebase';

export default function Image({ src, caption }) {
	const doubleTapContent = useRef();
	const { content, dispatch, totalLikes, userLiked } = useContext(
		LightBoxContext
	);
	const {
		user: { uid: userId = '' }
	} = useContext(UserContext);
	const docId = content.docId;
	const onDoubleTap = async () => {
		console.log('DOUBLE TAP OCCURRED');
		// Need to update the likes so I need to bring the context in here
		//Switch to opposite
		await handleToggleLiked(userId, docId, userLiked);
		const newLikeAmount = userLiked ? totalLikes - 1 : totalLikes + 1;
		const newUserLiked = !userLiked;
		dispatch({ totalLikes: newLikeAmount, userLiked: newUserLiked });
	};
	useDoubleTap(doubleTapContent, onDoubleTap);
	return (
		<figure ref={doubleTapContent} className='post__img'>
			<img className='w-full' src={src} alt={caption} />
		</figure>
	);
}

Image.propTypes = {
	src: PropTypes.string.isRequired,
	caption: PropTypes.string.isRequired
};
