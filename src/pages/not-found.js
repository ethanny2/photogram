import React, { useEffect } from 'react';

export default function NotFound() {
	useEffect(() => {
		document.title = 'Page Not Found - Instagram';
	}, []);

	return (
		<section className='bg-gray-200'>
			<div className='mx-auto max-w-screen-lg'>
				<p className='text-2xl text-center font-bold mb-5'> Sorry, this page isn't available.</p>
        <p className="text-sm text-center">The link you followed may be broken, or the page may have been removed. Go back to Instagram.</p>
			</div>
		</section>
	);
}
