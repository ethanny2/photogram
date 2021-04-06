import { useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import Actions from '../Post/actions';
import Header from './header';
import Body from './body';
import Media from './media';
import { createPortal } from 'react-dom';
import OutsideModalWrapper from './outsideModalWrapper';
import AddComment from '../Post/addComment';
import LightboxContext from '../../context/lightbox';

export default function Lightbox(
	{
		// content,
		// onDismiss,
		// comments,
		// setComments
	}
) {
	const commentInput = useRef(null);
	const handleFocus = () => {
		/*Storing a dom ref to an input tag to focus it */
		commentInput.current.focus();
	};
	const {
		lightboxState: {
			content,
			comments,
			setComments,
			dispatch,
			onLightboxClose:onDismiss
		}
	} = useContext(LightboxContext);

	console.log('comments in lightbox', comments);
	return createPortal(
		<OutsideModalWrapper onDismiss={onDismiss}>
			<article
				className={`block center-fixed w-11/12 lg:w-6/12 z-10
      md:px-0 shadow-md overflow-hidden
      fixed inset-0 top-2/4 left-2/4 flex-col flex 	rounded md:flex-row  border bg-white 
			mb-16 lg:h-5/6 h-5/6 `}
			>
				<Media src={content.imageSrc} caption={content.caption}></Media>
				<div className='flex flex-col w-12/12 md:w-4/12  justify-start h-full'>
					<Header
						username={content.username}
						caption={content.caption}
						onDismiss={onDismiss}
					></Header>
					<Body
						caption={content.caption}
						username={content.username}
						docId={content.docId}
						comments={comments}
						posted={content.dateCreated}
						commentInput={commentInput}
					></Body>
					<Actions
						docId={content.docId}
						totalLikes={content.likes.length}
						likedPhoto={content.userLikedPhoto}
						handleFocus={handleFocus}
					/>
					<AddComment
						docId={content.docId}
						comments={comments}
						setComments={setComments}
						commentInput={commentInput}
					></AddComment>
				</div>
			</article>
		</OutsideModalWrapper>,
		document.getElementById('lightbox')
	);
}

// Lightbox.propTypes = {
// 	content: PropTypes.shape({
// 		username: PropTypes.string.isRequired,
// 		imageSrc: PropTypes.string.isRequired,
// 		caption: PropTypes.string.isRequired,
// 		docId: PropTypes.string.isRequired,
// 		userLikedPhoto: PropTypes.bool.isRequired,
// 		likes: PropTypes.array.isRequired,
// 		comments: PropTypes.array.isRequired,
// 		dateCreated: PropTypes.number.isRequired
// 	}),
// 	onDismiss: PropTypes.func.isRequired
// };
