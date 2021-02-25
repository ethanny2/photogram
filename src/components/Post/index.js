import { useRef } from 'react';
import Actions from './actions';
import Header from './header';
import Footer from './footer';
import Comments from './comments';
import Image from './image';

export default function Post({ content }) {
	const commentInput = useRef(null);
	const handleFocus = () => {
		/*Storing a dom ref to an input tag to focus it */
		commentInput.current.focus();
	};
	return (
		<article className='rounded col-span-4 border bg-white mb-16'>
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
