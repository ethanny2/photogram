import { Link } from 'react-router-dom';
import samplePhoto from '../../images/avatars/raphael.jpg';

export default function Header({ username }) {
	return (
		<header className='flex border-b h-4 p-4 py-8 '>
			<div className='flex items-center'>
				<Link to={`/p/${username}`} className='flex items-center'>
					<img className="rounded h-8 w-8 flex mr-3"src={samplePhoto} alt={`${username} profile`} />
				</Link>
				<p className='font-bold'>{username}</p>
			</div>
		</header>
	);
}
