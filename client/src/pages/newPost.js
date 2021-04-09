import { useState, useEffect } from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import daliAvatar from '../images/avatars/dali.jpg';
import useUser from '../hooks/useUser';
import Skeleton from 'react-loading-skeleton';

// Make this protected/ only visible by logged in users
// Prop comes from state passed by <Route></Route>
export default function NewPost({ user: loggedInUser }) {
	const { user } = useUser(loggedInUser?.uid);
	return (
		<section className='h-full'>
			<Header />
			<article className='mx-auto flex flex-col justify-between items-center max-w-sm h-full'>
				{user?.username ? (
					<>
						<Link to={`/p/${user?.username}`}>
							<img
								className='w-18 h-14  lg:w-20 rounded-full lg:h-20 flex'
								src={daliAvatar}
								alt={`${user.username} profile`}
							/>
						</Link>
						<form
							autoComplete='off'
							method='post'
							className='flex flex-col items-center justify-center'
						>
							<textarea
								className='border border-gray-primary my-8 p-1 w-9/12 '
								placeholder="What's happening?"
								name='post-text'
								id='post-text'
								cols='50'
								rows='10'
								aria-label='post-caption'
							></textarea>
							<div className='flex flex-row justify-between'>
								<label
									tabindex='0'
									role='button'
									htmlFor='photo-upload'
									className='flex flex-row justify-between items-center border flex border-gray-primary w-10/12 p-2 bg-blue-500 font-bold text-sm rounded text-white h-9'
									onKeyDown={(e) => {
										if (
											e.key === ' ' ||
											e.key === 'Enter' ||
											e.key === 'Spacebar'
										) {
											e.target.click();
										}
									}}
								>
									{/* <button type="button" className='border flex border-gray-primary w-full p-2 bg-blue-500 font-bold text-sm rounded text-white h-9 text-center'> */}
									Upload
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='ml-3 h-5 w-5'
										fill='none'
										viewBox='0 0 24 24'
										stroke='currentColor'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
										/>
									</svg>
									{/* </button> */}
								</label>
								<input
									aria-hidden='true'
									accept='image/*'
									type='file'
									name='photo-upload'
									id='photo-upload'
									className='hidden'
								/>
								<button className='flex flex-row justify-between items-center border flex border-gray-primary w-10/12 p-2 bg-blue-500 font-bold text-sm rounded text-white h-9'>
									Post
								</button>
							</div>
						</form>
					</>
				) : (
					<>
						<p>Loading...</p>
						<Skeleton count={1} width={300} height={400} className='mb-5' />
						<Skeleton count={1} width={250} height={100} className='mb-5' />
					</>
				)}
			</article>
		</section>
	);
}
