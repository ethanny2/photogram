import {useRef} from 'react';
import Actions from './actions';
import Header from './header';
import Footer from './footer';
import Comment from './comment';
import Image from './image';

export default function Post({ content }) {
  const commentInput = useRef(null);
  const handleFocus = () => {
    /*Storing a dom ref to an input tag to focus it */
    commentInput.current.focus();
  }
	return (
		<article className='bg-white rounded border mb-8 col-span-4'>
			<Image src={content.imageSrc} caption={content.caption}></Image>
			<Actions
				docId={content.docId}
				totalLikes={content.likes.length}
				likedPhoto={content.userLikedPhoto}
				handleFocus={handleFocus}
			/>
			<Footer username={content.username} caption={content.caption} />
		</article>
	);
}
