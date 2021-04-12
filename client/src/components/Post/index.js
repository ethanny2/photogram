import { useRef } from 'react';
import PropTypes from 'prop-types';
import Actions from './actions';
import Header from './header';
import Footer from './footer';
import Comments from './comments';
import Image from './image';
import useLightbox from '../../hooks/useLightbox';
import LightBoxContext from '../../context/lightbox';
import LightBox from '../LightBox';

export default function Post({ content: curPostContent }) {
	const commentInput = useRef(null);
	const handleFocus = () => {
		/*Storing a dom ref to an input tag to focus it */
		commentInput.current.focus();
	};
	const {
		visible,
		comments,
		setComments,
		totalLikes,
		userLiked,
		dispatch,
		onDismiss
	} = useLightbox(
		curPostContent.likes.length,
		curPostContent.userLikedPhoto,
		curPostContent.comments
	);

	return (
		<LightBoxContext.Provider
			value={{
				visible,
				content: { ...curPostContent },
				setComments,
				dispatch,
				onDismiss,
				comments,
				totalLikes,
				userLiked
			}}
		>
			{visible ? <LightBox /> : null}
			<article className='rounded col-span-4 border bg-white mb-16'>
				<Header
					username={curPostContent?.username}
					profilePic={curPostContent.profilePic}
				></Header>
				<Image
					src={curPostContent?.imageSrc}
					caption={curPostContent?.caption}
				></Image>
				<Actions handleFocus={handleFocus} />
				<Footer
					username={curPostContent?.username}
					caption={curPostContent?.caption}
				/>
				<Comments commentInput={commentInput}></Comments>
			</article>
		</LightBoxContext.Provider>
	);
}

Post.propTypes = {
	content: PropTypes.shape({
		username: PropTypes.string.isRequired,
		imageSrc: PropTypes.string.isRequired,
		caption: PropTypes.string.isRequired,
		docId: PropTypes.string.isRequired,
		userLikedPhoto: PropTypes.bool.isRequired,
		likes: PropTypes.array.isRequired,
		comments: PropTypes.array.isRequired,
		dateCreated: PropTypes.number.isRequired
	})
};
