import Header from '../Header';
import PropTypes from 'prop-types';
import LoggedInUserContext from '../../context/logged-in-user';
import FooterNav from '../FooterNav';
import { useEffect, useContext, lazy } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import Sidebar from './sidebar';
import * as ROUTES from '../../constants/routes';
const ProfileEdit = lazy(() => import('./profile-edit'));
const PasswordEdit = lazy(() => import('./password-edit'));
const PrivacyEdit = lazy(() => import('./privacy-edit'));

// Instead of copy pasting for each different tab in the
// settings why don't I use this but swap out what is rendered
// depending on a passed in prop

export default function SettingsContainer() {
	const { user } = useContext(LoggedInUserContext);
	let { path, url } = useRouteMatch();
	let selectedComponent;
	console.log({ url }, { path });
	switch (url) {
		case ROUTES.PROFILE_SETTINGS:
			selectedComponent = <ProfileEdit />;
			break;
		case ROUTES.PASSWORD_SETTINGS:
			selectedComponent = <PasswordEdit />;
			break;
		case ROUTES.PRIVACY_SETTINGS:
			selectedComponent = <PrivacyEdit />;
			break;
		default:
			break;
	}

	return (
		<div className='  mb-20 w-11/12 max-w-screen-md rounded grid grid-cols-5 gap-0 mx-4 container mx-auto h-full bg-white border border-gray-primary'>
			<Sidebar />
			<div className='col-span-4 flex flex-col justify-start items-center'>
				{selectedComponent}
			</div>
		</div>
	);
}
