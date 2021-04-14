import Header from '../components/Header';
import PropTypes from 'prop-types';
import LoggedInUserContext from '../context/logged-in-user';
import FooterNav from '../components/FooterNav';
import useUser from '../hooks/useUser';
import { useEffect } from 'react';
import SettingsContainer from '../components/SettingsContainer';

export default function Settings({ user: loggedInUser }) {
	const { user } = useUser(loggedInUser.uid);
	useEffect(() => {
		document.title = 'Edit Profile - Instagram';
	}, []);
	return (
		<LoggedInUserContext.Provider value={{ user }}>
			<section className='bg-gray-100'>
				<Header />
				<SettingsContainer />
				<FooterNav />
			</section>
		</LoggedInUserContext.Provider>
	);
}

Settings.propTypes = {
	user: PropTypes.object.isRequired
};
