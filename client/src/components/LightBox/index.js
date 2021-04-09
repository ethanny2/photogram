import { useRef, useContext } from 'react';
import Actions from '../Post/actions';
import Header from './header';
import Body from './body';
import Media from './media';
import { createPortal } from 'react-dom';
import OutsideModalWrapper from './outsideModalWrapper';
import AddComment from '../Post/addComment';
import LightboxContext from '../../context/lightbox';

export default function Lightbox() {
	const commentInput = useRef(null);
	const handleFocus = () => {
		/*Storing a dom ref to an input tag to focus it */
		commentInput.current.focus();
	};
	const { content, comments, onDismiss } = useContext(LightboxContext);

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
					<Body caption={content.caption} username={content.username}></Body>
					<Actions handleFocus={handleFocus} />
					<AddComment commentInput={commentInput}></AddComment>
				</div>
			</article>
		</OutsideModalWrapper>,
		document.getElementById('lightbox')
	);
}
