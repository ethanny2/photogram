import Header from '../components/Header';
import PropTypes from 'prop-types';
import LoggedInUserContext from '../context/logged-in-user';
import FooterNav from '../components/FooterNav';
import useUser from '../hooks/useUser';
import SettingsContainer from '../components/SettingsContainer';

export default function Settings({ user: loggedInUser }) {
	const { user } = useUser(loggedInUser.uid);

	return (
		<LoggedInUserContext.Provider value={{ user }}>
			<section className='bg-gray-50 pb-2'>
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
