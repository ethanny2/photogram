import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProtectedRoute from './helpers/protected-route';
// import IsUserLoggedIn from './helpers/is-user-logged-in';

import * as ROUTES from './constants/routes';
import './index.css';
import UserContext from './context/user';
import useAuthListener from './hooks/useAuthListener';
/* Returns component of dynamically imported file. Loads only when
it is needed/ rendered to the screen. It will not load
it that component is a different page (e.g. not being rendered)
We wrap these lazy components in suspense to show something else
while the content is loading*/

/* Okay... I haven't rendered them yet but my App says the file is not found...
Maybe this is a new react 17 change; its okay since I will define these components later*/
const Dashboard = lazy(() => import('./pages/dashboard'));
const Login = lazy(() => import('./pages/login'));
const SignUp = lazy(() => import('./pages/signup'));
const Profile = lazy(() => import('./pages/profile'));
const NotFound = lazy(() => import('./pages/not-found'));

function App() {
	const { user } = useAuthListener();
	//helloworld11
	console.log({ user });
	return (
		<UserContext.Provider value={{ user }}>
			<Router>
				<Suspense fallback={<p>Loading....</p>}>
					<Switch>
						{/* <IsUserLoggedIn
							user={user}
							loggedInPath={ROUTES.DASHBOARD}
							path={ROUTES.LOGIN}
						>
							<Login />

						</IsUserLoggedIn> */}
						<Route path={ROUTES.LOGIN} component={Login} />
						<Route path={ROUTES.SIGN_UP} component={SignUp} />

						{/* <IsUserLoggedIn
							user={user}
							loggedInPath={ROUTES.DASHBOARD}
							path={ROUTES.SIGN_UP}
						>
							<SignUp />

						</IsUserLoggedIn> */}

						<Route path={ROUTES.PROFILE} component={Profile} />
						<ProtectedRoute user={user} path={ROUTES.DASHBOARD} exact>
							<Dashboard />
						</ProtectedRoute>
						{/* Last route is always served if nothing is found with no path prop*/}
						<Route component={NotFound} />
					</Switch>
				</Suspense>
			</Router>
		</UserContext.Provider>
	);
}

export default App;
