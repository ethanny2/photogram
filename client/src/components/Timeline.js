import { useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import useFollowedUserPhotos from '../hooks/useFollowedUsersPhotos';
import Post from '../components/Post';
import LoggedInUserContext from '../context/logged-in-user';

export default function Timeline() {
	const { user } = useContext(LoggedInUserContext);
	const { photos } = useFollowedUserPhotos(user);
	return (
		<section className='col-span-3 md:col-span-2'>
			{photos ? (
				photos.map((photo) => {
					return <Post key={photo.docId} content={photo}></Post>;
				})
			) : photos?.length <= 0 ? (
				<p>No posts from followers yet!</p>
			) : (
				<Skeleton count={4} height={500} className='mb-5' />
			)}
		</section>
	);
}
