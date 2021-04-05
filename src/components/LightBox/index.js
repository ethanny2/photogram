import { useRef } from 'react';
import PropTypes from 'prop-types';
import Actions from './actions';
import Header from './header';
import Body from './body';
import Media from './media';
import { createPortal } from 'react-dom';
import OutsideModalWrapper from './outsideModalWrapper';

export default function Lightbox({ content, onDismiss }) {
	const commentInput = useRef(null);
	const handleFocus = () => {
		/*Storing a dom ref to an input tag to focus it */
		commentInput.current.focus();
	};
	return createPortal(
		<OutsideModalWrapper onDismiss={onDismiss}>
			<article
				className={`block center-fixed w-8/12 z-10
      px-4 lg:px-0 shadow-md overflow-hidden
      fixed inset-0 top-2/4 left-2/4	rounded grid grid-cols-3 border bg-white 
			mb-16 grid h-5/6 `}
			>
				<Media src={content.imageSrc} caption={content.caption}></Media>
				<div className='col-span-1 flex flex-col  justify-start h-full'>
					<Header username={content.username}></Header>
					<Body
						docId={content.docId}
						comments={content.comments}
						posted={content.dateCreated}
						commentInput={commentInput}
					></Body>
					<Actions
						docId={content.docId}
						totalLikes={content.likes.length}
						likedPhoto={content.userLikedPhoto}
						handleFocus={handleFocus}
					/>
				</div>
			</article>
		</OutsideModalWrapper>,
		document.getElementById('lightbox')
	);
}

Lightbox.propTypes = {
	content: PropTypes.shape({
		username: PropTypes.string.isRequired,
		imageSrc: PropTypes.string.isRequired,
		caption: PropTypes.string.isRequired,
		docId: PropTypes.string.isRequired,
		userLikedPhoto: PropTypes.bool.isRequired,
		likes: PropTypes.array.isRequired,
		comments: PropTypes.array.isRequired,
		dateCreated: PropTypes.number.isRequired
	}),
	onDismiss: PropTypes.func.isRequired
};
