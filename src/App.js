import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
	const {user} = useAuthListener();
	return (
		<UserContext.Provider value={{user}}>
			<Router>
				<Suspense fallback={<p>Loading....</p>}>
					<Switch>
						<Route path={ROUTES.LOGIN} component={Login} />
						<Route path={ROUTES.SIGN_UP} component={SignUp} />
						<Route path={ROUTES.PROFILE} component={Profile} />
						<Route path={ROUTES.DASHBOARD} component={Dashboard} exact />
						{/* Last route is always served if nothing is found with no path prop*/}
						<Route component={NotFound} />
					</Switch>
				</Suspense>
			</Router>
		</UserContext.Provider>
	);
}

export default App;
