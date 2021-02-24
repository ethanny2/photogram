import FirebaseContext from '../../context/firebase';
import UserContext from '../../context/user';
import { useContext, useState } from 'react';

/* Actions include making a like, a bookmark or comment? */
export default function Actions({
	docId,
	totalLikes,
	likedPhoto,
	handlePhoto
}) {
	const [toggleLiked, setToggleLiked] = useState(likedPhoto);
	const [likes, setLikes] = useState(totalLikes);
	const handleToggleLiked = async () => {};
	const { firebase, FieldValue } = useContext(FirebaseContext);
	console.log({ toggleLiked });
	return (
		<>
			<div className='flex justify-between'>
				<div className='flex'>
					<svg
						//First outer function calls handleToggleLiked for the backend side
						// Second returned function just toggles the localState to change UI of heart btn
						//WE'RE NOT DOING ANYTHING WITH THE RETURN VALUE OF handleToggleLiked; we IGNORE IT
						onClick={() => handleToggleLiked((toggleLiked) => !toggleLiked)}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								handleToggleLiked((toggleLiked) => !toggleLiked);
							}
						}}
						className={`w-8 mr-4 select-none cursor-pointer 
						 ${toggleLiked ? '	fill-current text-red-500' : 'text-black'}`}
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
						tabIndex={0}
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
						/>
					</svg>
				</div>
			</div>
			<div className='p-4 py-0'>
				<p className='font-bold'>
					{likes === 1 ? `${likes} like` : `${likes} likes`}
				</p>
			</div>
		</>
	);
}
