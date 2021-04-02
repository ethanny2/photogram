import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import { cloneElement } from 'react';
export default function ProtectedRoute({ user, children, ...rest }) {
	return (
		<Route
			{...rest}
			render={({ location }) => {
				if (user) {
					// So we don't call useUser unecessarily when a profile page is visited that doesn't checkUserExistsToLoadProfile
					// This way we can pass the user prop/data from App this specific route. Saving us some network calls
					return cloneElement(children, { user });
				}
				if (!user) {
					return (
						<Redirect
							to={{ pathname: ROUTES.LOGIN, state: { from: location } }}
						></Redirect>
					);
				}
				return null;
			}}
		></Route>
	);
}

ProtectedRoute.propTypes = {
	user: PropTypes.object.isRequired,
	children: PropTypes.object.isRequired
};
