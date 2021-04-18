import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProtectedRoute from './helpers/protected-route';
import * as ROUTES from './constants/routes';
import './index.css';
import UserContext from './context/user';
import useAuthListener from './hooks/useAuthListener';
import Header from './components/Header';

const Dashboard = lazy(() => import('./pages/dashboard'));
const Login = lazy(() => import('./pages/login'));
const SignUp = lazy(() => import('./pages/signup'));
const Profile = lazy(() => import('./pages/profile'));
const NotFound = lazy(() => import('./pages/not-found'));
const NewPost = lazy(() => import('./pages/newPost'));
const Settings = lazy(() => import('./pages/settings'));
const Explore = lazy(() => import('./pages/explore'));

function App() {
	const { user } = useAuthListener();
	return (
		<UserContext.Provider value={{ user }}>
			<Router>
				<Suspense fallback={<Header />}>
					<Switch>
						<Route path={ROUTES.LOGIN} component={Login} />
						<Route path={ROUTES.SIGN_UP} component={SignUp} />
						<Route path={ROUTES.PROFILE} component={Profile} />
						<ProtectedRoute user={user} path={ROUTES.DASHBOARD} exact>
							<Dashboard />
						</ProtectedRoute>
						<ProtectedRoute user={user} path={ROUTES.NEW_POST} exact>
							<NewPost />
						</ProtectedRoute>
						<ProtectedRoute user={user} path={ROUTES.PROFILE_SETTINGS} exact>
							<Settings />
						</ProtectedRoute>
						<ProtectedRoute user={user} path={ROUTES.PASSWORD_SETTINGS} exact>
							<Settings />
						</ProtectedRoute>
						<ProtectedRoute user={user} path={ROUTES.PRIVACY_SETTINGS} exact>
							<Settings />
						</ProtectedRoute>
						<ProtectedRoute user={user} path={ROUTES.EXPLORE} exact>
							<Explore />
						</ProtectedRoute>
						<Route component={NotFound} />
					</Switch>
				</Suspense>
			</Router>
		</UserContext.Provider>
	);
}

export default App;
