import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './LightBox.css';
export default function Body({
	docId,
	comments: allComments,
	posted,
	commentInput,
	caption,
	username
}) {
	//
	console.log({ allComments });
	return (
		<div className='lightbox-comments comment-grow flex border-b border-gray-primary items-start flex-col justify-start overflow-y-scroll p-3  h-6/6 md:h-5/6	w-full'>
			<p key={`${caption}-${username}`} className='mb-3'>
				<Link to={`/p/${username}`}>
					<span className='mr-1 font-bold text-blue-600'>{username}</span>
				</Link>
				<span>{caption}</span>
			</p>
			{allComments.map((comment) => {
				return (
					<p key={`${comment.comment}-${comment.displayName}`} className='mb-3'>
						<Link to={`/p/${comment.displayName}`}>
							<span className='mr-1 font-bold'>{comment.displayName}</span>
						</Link>
						<span>{comment.comment}</span>
					</p>
				);
			})}
		</div>
	);
}

Body.propTypes = {
	docId: PropTypes.string.isRequired,
	comments: PropTypes.array.isRequired,
	posted: PropTypes.number.isRequired,
	commentInput: PropTypes.object.isRequired,
	caption: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired
};
