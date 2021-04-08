import { debounce } from 'lodash';
import { useState, useEffect, useCallback } from 'react';
import { userSearch } from '../services/firebase';

export default function SearchBar() {
	const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState(null);
	return (
		<div>
			<form action='POST'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					className='h-4 w-4 absolute mt-1.5'
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
					className='border border-gray-primary outline-none ml-5 text-center'
					aria-label='userSearch'
					type='text'
					name='userSearch'
					id='userSearch'
					placeholder='Search'
					value={searchText}
					onChange={({ target }) => setSearchText(target.value)}
				/>
			</form>
      
		</div>
	);
}
