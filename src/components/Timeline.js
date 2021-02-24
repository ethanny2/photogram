import React from 'react';
import Skeleton from 'react-loading-skeleton';
import useFollowedUserPhotos from '../hooks/useFollowedUsersPhotos';
import Post from '../components/Post';

export default function Timeline() {
	const { photos } = useFollowedUserPhotos();
	return (
		<section className='container col-span-2'>
			{photos ? (
				photos.map((photo) => {
					return <Post key={photo.docId} content={photo}></Post>;
				})
			) : (
				<Skeleton count={4} width={640} height={500} className='mb-5' />
			)}
		</section>
	);
}
