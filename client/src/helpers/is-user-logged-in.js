import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

export default function IsUserLoggedIn({
	user,
	loggedInPath,
	children,
	...rest
}) {
	return (
		<Route
			{...rest}
			render={({ location }) => {
				// Only show login and signup page to users who aren't logged in
				if (!user) {
					return children;
				}
				if (user) {
					return (
						<Redirect
							to={{ pathname: loggedInPath, state: { from: location } }}
						></Redirect>
					);
				}
				return null;
			}}
		></Route>
	);
}

IsUserLoggedIn.propTypes = {
	user: PropTypes.object.isRequired,
	loggedInPath: PropTypes.string.isRequired,
	children: PropTypes.object.isRequired
};
