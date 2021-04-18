import { Link, useRouteMatch } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

export default function Sidebar() {
	let { url } = useRouteMatch();
	return (
		<nav className='h-full min-h-screen border-r-2 border-gray-primary col-span-1 flex'>
			<ul className=' w-full h-full min-h-screen flex flex-col justify-around items-center'>
				<li>
					<Link className='w-full' to={ROUTES.PROFILE_SETTINGS}>
						<p
							className={`w-full hidden sm:block text-md font-bold ${
								url === ROUTES.PROFILE_SETTINGS ? 'text-blue-500' : ''
							}`}
						>
							Edit Profile
						</p>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className={`h-9 w-9 sm:hidden ${
								url === ROUTES.PROFILE_SETTINGS
									? 'stroke-current text-blue-500'
									: ''
							}`}
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2'
							/>
						</svg>
					</Link>
				</li>
				<li>
					<Link className='w-full' to={ROUTES.PASSWORD_SETTINGS}>
						<p
							className={`w-full hidden sm:block text-md font-bold ${
								url === ROUTES.PASSWORD_SETTINGS ? 'text-blue-500' : ''
							}`}
						>
							Password
						</p>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className={`h-9 w-9 sm:hidden ${
								url === ROUTES.PASSWORD_SETTINGS
									? 'stroke-current text-blue-500'
									: ''
							}`}
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z'
							/>
						</svg>
					</Link>
				</li>
				<li>
					<Link className='w-full' to={ROUTES.PRIVACY_SETTINGS}>
						<p
							className={`w-full hidden sm:block text-md font-bold ${
								url === ROUTES.PRIVACY_SETTINGS ? 'text-blue-500' : ''
							}`}
						>
							Security
						</p>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className={`h-9 w-9 sm:hidden ${
								url === ROUTES.PRIVACY_SETTINGS
									? 'stroke-current text-blue-500'
									: ''
							}`}
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
							/>
						</svg>
					</Link>
				</li>
			</ul>
		</nav>
	);
}
