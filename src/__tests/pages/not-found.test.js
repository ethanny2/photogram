import React from 'react';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import NotFound from '../../pages/not-found';
import FirebaseContext from '../../context/firebase';
import UserContext from '../../context/user';
import { BrowserRouter as Router } from 'react-router-dom';
// getUserByUserId is used in header to determine if a user is logged in we need to mock that
import userFixture from '../../fixtures/logged-in-user';
jest.mock('../../services/firebase')
import { getUserByUserId } from '../../services/firebase';

// S3 Bucket mocking https://github.com/facebook/jest/issues/5962

describe('<NotFound/>', () => {
	// beforeEach(() => {
	// 	getUserByUserId.mockReset();
	// });
	it('renders the 404/ not found page with a logged in user', async () => {
		const { getUserByUserId } = require('../../services/firebase');
		//Need for provider used in Header but no firebase interaction occurs on the
		// not found page.
		// Comes back as array of 1 if successfull.
		await act(async () => {
			await getUserByUserId.mockImplmentation(() => [userFixture]);
			const { getByText } = render(
				<Router>
					<FirebaseContext.Provider value={firebase}>
						<UserContext.Provider value={user}>
							<NotFound />
						</UserContext.Provider>
					</FirebaseContext.Provider>
				</Router>
			);
		});
		const firebase = {};
		const user = { uuid: 1 };

		expect(document.title).toEqual('Page Not Found - Instagram');
	});
});

// import React from 'react';
// import { render } from '@testing-library/react';
// import { BrowserRouter as Router } from 'react-router-dom';
// import NotFound from '../../pages/not-found';
// import FirebaseContext from '../../context/firebase';
// import UserContext from '../../context/user';

// const firebase = {
// 	auth: jest.fn(() => ({
// 		createUserWithEmailAndPassword: jest.fn(() =>
// 			Promise.resolve({
// 				user: {
// 					updateProfile: jest.fn(() => Promise.resolve('I am signed up!'))
// 				}
// 			})
// 		)
// 	}))
// };

// describe('<NotFound />', () => {
// 	it('renders the not found page with a logged in user', async () => {
// 		const { getByText } = render(
// 			<Router>
// 				<FirebaseContext.Provider value={{ firebase }}>
// 					<UserContext.Provider value={{ user: {} }}>
// 						<NotFound />
// 					</UserContext.Provider>
// 				</FirebaseContext.Provider>
// 			</Router>
// 		);

// 		expect(getByText("Sorry, this page isn't available.")).toBeTruthy();
// 		expect(document.title).toEqual('Page Not Found - Instagram');
// 	});
// });
