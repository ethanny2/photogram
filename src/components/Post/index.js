import { useRef } from 'react';
import PropTypes from 'prop-types';

import Actions from './actions';
import Header from './header';
import Footer from './footer';
import Comments from './comments';
import Image from './image';
import Lightbox from '../LightBox';
import { useState } from 'react';

export default function Post({ content }) {
	const commentInput = useRef(null);
	const handleFocus = () => {
		/*Storing a dom ref to an input tag to focus it */
		commentInput.current.focus();
	};
	const [lightboxVisible, setLightboxVisible] = useState(false);
	return (
		<article
			onClick={() => setLightboxVisible((prevState) => !prevState)}
			className='rounded col-span-4 border bg-white mb-16'
		>
			<Lightbox visible={lightboxVisible} content={content} />
			<Header username={content.username}></Header>
			<Image src={content.imageSrc} caption={content.caption}></Image>
			<Actions
				docId={content.docId}
				totalLikes={content.likes.length}
				likedPhoto={content.userLikedPhoto}
				handleFocus={handleFocus}
			/>
			<Footer username={content.username} caption={content.caption} />
			<Comments
				docId={content.docId}
				comments={content.comments}
				posted={content.dateCreated}
				commentInput={commentInput}
			></Comments>
		</article>
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
