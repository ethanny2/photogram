import React from 'react';
import { queryByText, render, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import NotFound from '../../pages/not-found';
import FirebaseContext from '../../context/firebase';
import UserContext from '../../context/user';
import { BrowserRouter as Router } from 'react-router-dom';
// getUserByUserId is used in header to determine if a user is logged in we need to mock that
import { getUserByUserId } from '../../services/firebase';
import userFixture from '../../fixtures/logged-in-user';
jest.mock('../../services/firebase');
// S3 Bucket mocking https://github.com/facebook/jest/issues/5962

describe('<NotFound/>', () => {
	it('renders the 404/ not found page with a logged in user', async () => {
		const user = { uid: 1 };
		//Need for provider used in Header but no firebase interaction occurs on the
		// not found page.
		await act(async () => {
			// Comes back as array of 1 if successfull.
			await getUserByUserId.mockImplementation(() => [userFixture]);
			const { queryByText } = render(
				<Router>
					<FirebaseContext.Provider value={{}}>
						<UserContext.Provider value={{ user }}>
							<NotFound />
						</UserContext.Provider>
					</FirebaseContext.Provider>
				</Router>
			);
			await waitFor(() => {
				expect(queryByText('Log In')).toBeFalsy();
				expect(queryByText(`Sorry, this page isn't available.`)).toBeTruthy();
				expect(document.title).toEqual('Page Not Found - Instagram');
			});
		});
	});
	it('renders the 404/ not found page with an anon user', async () => {
		await act(async () => {
			// Comes back as array of 1 if successfull.
			await getUserByUserId.mockImplementation(() => []);
			const { queryByText } = render(
				<Router>
					<FirebaseContext.Provider value={{}}>
						<UserContext.Provider value={{ user: {} }}>
							<NotFound />
						</UserContext.Provider>
					</FirebaseContext.Provider>
				</Router>
			);
			await waitFor(() => {
				expect(queryByText('Log In')).toBeTruthy();
				expect(queryByText(`Sorry, this page isn't available.`)).toBeTruthy();
				expect(document.title).toEqual('Page Not Found - Instagram');
			});
		});
	});
});
