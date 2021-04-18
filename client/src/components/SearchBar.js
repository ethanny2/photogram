import { debounce } from 'lodash';
import { useState, useEffect, useCallback } from 'react';
import { userSearch } from '../services/firebase';
import { Link } from 'react-router-dom';

export default function SearchBar() {
	const [searchText, setSearchText] = useState('');
	const [results, setResults] = useState(null);
	const funcToMemoize = debounce(userSearch, 800, {
		leading: true
	});
	let debouncedUserSearch = useCallback(funcToMemoize, [funcToMemoize]);

	useEffect(() => {
		// Guard against possible mem leaks for setting state
		// on unmounted searchbar
		let isStillMounted = true;
		async function getUserNames() {
			const response = await debouncedUserSearch(searchText);
			if (response && isStillMounted) {
				setResults(response);
			} else {
				setResults([]);
			}
		}
		if (searchText.length > 3 && isStillMounted) {
			getUserNames();
		}
		if (searchText.length === 0) setResults(null);
		return () => {
			isStillMounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchText, setSearchText, setResults]);

	return (
		<div>
			<form
				action='POST'
				autoComplete='off'
				className='relative'
				onSubmit={(e) => e.preventDefault()}
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					className='hidden sm:block h-4 w-4 absolute top-2 left-5'
					fill='none'
					viewBox='0 0 24 24'
					stroke='currentColor'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
					/>
				</svg>
				<input
					className='  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 bg-gray-100 rounded border mt-1 w-10/12 lg:w-full border-gray-primary outline-none  text-center'
					aria-label='userSearch'
					type='text'
					name='userSearch'
					id='userSearch'
					placeholder='Search'
					value={searchText}
					onChange={({ target }) => setSearchText(target.value)}
				/>
			</form>
			{results && (
				<ul
					className={`m1-3 xs2:ml-1 md:-ml-3 fixed bg-white w-2/12 xs2:w-6/12 lg:w-8/12 py-2  max-w-sm shadow-md rounded border border-gray-100
					flex flex-col`}
					style={{ maxWidth: '17rem', minWidth: '10rem' }}
				>
					{results.length <= 0 ? (
						<li className='ml-3 lg:px-2 flex flex-row justify-start items-center'>
							<div className='mr-3 '>
								<p>No users found</p>
							</div>
						</li>
					) : (
						results.map((user, idx) => {
							return (
								<Link
									key={user.userId}
									to={`/p/${user?.username}`}
									onClick={() => {
										// When result is clicked clear the
										// search bar
										setResults(null);
										setSearchText('');
									}}
								>
									<li
										className={`ml-3 flex flex-row justify-start items-center ${
											results.length === idx + 1 ? '' : 'mb-5'
										}`}
									>
										<div className='mr-3 ' style={{ minWidth: '2rem' }}>
											<img
												className=' w-8 h-8 sm:w-8 sm:h-8 md:w-8 lg:w-12 rounded-full md:h-8 lg:h-12 flex'
												src={user.profilePic}
												alt={`${user.username} profile`}
											/>
										</div>
										<div className='flex flex-col text-left'>
											<p className='text-lg font-semibold'>{user.username}</p>
											<span className='text-sm text-gray-300'>
												{user.fullName}
											</span>
										</div>
									</li>
								</Link>
							);
						})
					)}
				</ul>
			)}
		</div>
	);
}
