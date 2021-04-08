import PropTypes from 'prop-types';
import { useRef, useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import useDoubleTap from '../../hooks/useDoubleTap';
import LightBoxContext from '../../context/lightbox';
import UserContext from '../../context/user';
import { handleToggleLiked } from '../../services/firebase';

export default function Media({ src = '', caption }) {
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
		<figure
			ref={doubleTapContent}
			className=' hidden md:block md:w-8/12  md:h-full'
		>
			{src ? (
				<img className='w-full h-full object-fill' src={src} alt={caption} />
			) : (
				<Skeleton count={1} width={640} height={500} className='mb-5' />
			)}
		</figure>
	);
}

Media.propTypes = {
	caption: PropTypes.string.isRequired,
	src: PropTypes.string.isRequired
};
