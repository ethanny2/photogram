import { useState, useEffect } from 'react';
import Header from '../components/Header';
import { Link, useHistory } from 'react-router-dom';
import daliAvatar from '../images/avatars/dali.jpg';
import useUser from '../hooks/useUser';
import Skeleton from 'react-loading-skeleton';
import { addPhoto } from '../services/firebase';

// Make this protected/ only visible by logged in users
// Prop comes from state passed by <Route></Route>
export default function NewPost({ user: loggedInUser }) {
	const { user } = useUser(loggedInUser?.uid);
	const history = useHistory();
	const [publicFileUrl, setPublicFileUrl] = useState(null);
	const [imageLoading, setImageLoading] = useState(false);
	const [caption, setCaption] = useState('');
	const [error, setError] = useState(null);
	// HTML5 validation already works for the textarea
	useEffect(() => {
		document.title = 'Instagram - New Post';
	}, []);

	useEffect(() => {
		setError(null);
	}, [publicFileUrl, caption]);

	const getSignedRequest = async (file) => {
		// Show skeleton for image preview
		setImageLoading(true);
		try {
			const response = await fetch(
				`http://localhost:3001/sign-s3?username=${user.username}&file-name=${file.name}&file-type=${file.type}`
			);
			const { signedRequest: signedRequestUrl, url } = await response.json();
			// Send the PUT request with newly signed S3 url once it works
			// the resource is publicy available if it succeeds.
			console.log({ signedRequestUrl });
			console.log({ url });
			const putResponse = await fetch(signedRequestUrl, {
				method: 'PUT',
				body: file,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			});

			// const data = await putResponse.json();
			if (putResponse.ok) {
				console.log('file is accessible on ', url);
				setPublicFileUrl(url);
				setImageLoading(false);
			}
		} catch (error) {
			//Set some error state on the form
			setImageLoading(false);
			setError(error.message);
			console.error({ error });
		}
	};
	const handleFileChange = async ({ target }) => {
		const [file] = target.files;
		console.log({ file });
		if (!file) return;
		getSignedRequest(file);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!publicFileUrl) {
			setError('Please attach a photo to your post');
			return;
		}
		if (!caption) {
			setError('Please write a caption for your post');
			return;
		}
		try {
			await addPhoto(caption, user.userId, publicFileUrl);
			console.log('Successfully added new photo/post to firestore!');
			history.push(`/p/${user?.username}`);
		} catch (error) {
			setError(error.message);
			console.error({ error });
		}
	};

	return (
		<section className='h-full '>
			<Header />
			<article className='py-3 mx-auto flex flex-col justify-between items-center max-w-sm h-full'>
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
							onSubmit={handleSubmit}
						>
							<textarea
								className='border border-gray-primary mt-5 mb-2 p-1 w-9/12 '
								placeholder="What's happening?"
								name='post-text'
								id='post-text'
								cols='50'
								rows='10'
								aria-label='post-caption'
								value={caption}
								onChange={({ target }) => setCaption(target.value)}
							></textarea>
							{error && (
								<p data-testid='error' className='mt-4 text-xs text-red-500'>
									{error}
								</p>
							)}
							{publicFileUrl ? (
								<div className='my-3 h-5/12 w-5/12 max-w-sm text-left'>
									<span className='text-sm'>Preview: </span>
									<img
										className='max-w-full'
										src={publicFileUrl}
										alt={caption}
									/>
								</div>
							) : imageLoading ? (
								<Skeleton count={1} width={150} height={150} className='mb-5' />
							) : null}

							<div className='flex flex-row justify-between'>
								<label
									tabIndex='0'
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
								<div className='text-center'>
									<input
										onChange={handleFileChange}
										accept='image/*'
										type='file'
										name='photo-upload'
										id='photo-upload'
										className='hidden'
									/>
								</div>

								<button
									type='submit'
									className='flex flex-row justify-between items-center border flex border-gray-primary w-10/12 p-2 bg-blue-500 font-bold text-sm rounded text-white h-9'
								>
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
