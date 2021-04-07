import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './LightBox.css';
import { useContext } from 'react';
import LightBoxContext from '../../context/lightbox';
export default function Body({ caption, username }) {
	//
	const { comments: allComments } = useContext(LightBoxContext);
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
	caption: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired
};
