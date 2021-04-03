import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import SignUp from '../../pages/signup';
import FirebaseContext from '../../context/firebase';
import { BrowserRouter as Router } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { doesUsernameExist } from '../../services/firebase';

// You can use your jest.fn functions within jest.mock() to compose them
const mockHistoryPush = jest.fn();
// Don't want jest to automock all the functions in react-router-dom on everytest.
// We spread the real implementation in there for every other function besides the one we need.
// That one we specifically mock
jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useHistory: () => ({
		push: mockHistoryPush
	})
}));

jest.mock('../../services/firebase');

describe('<SignUp/>', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});
	it('renders the sign up page with a form submission and successfully signs a user up', async () => {
		const firebase = {
			firestore: jest.fn(() => ({
				collection: jest.fn(() => ({
					add: jest.fn(() => Promise.resolve('User added'))
				}))
			})),
			auth: jest.fn(() => ({
				createUserWithEmailAndPassword: jest.fn(() => ({
					user: {
						updateProfile: jest.fn(() => Promise.resolve('I am signed up'))
					}
				}))
			}))
		};
		const { getByTestId, getByPlaceholderText, queryByTestId } = render(
			<Router>
				<FirebaseContext.Provider value={{ firebase }}>
					<SignUp />
				</FirebaseContext.Provider>
			</Router>
		);
		// It's responsible for flushing all effects and rerenders after invoking it.
		await act(async () => {
			//No length array runs this code
			/*
				if(!userNameExists.length)
				which if we just resolve a promise with true is this...
				if(!true.length)
				true.length = undefined
				!undefined or !null = true
				So this is thruthy and will sign up the user
			*/
			await doesUsernameExist.mockImplementation(() => Promise.resolve(true)); // as true but inverse in the code

			expect(document.title).toEqual('Sign Up - Instagram');
			// Placeholder attr of input elem
			await fireEvent.change(getByPlaceholderText('Username'), {
				target: { value: 'test' }
			});
			await fireEvent.change(getByPlaceholderText('Full name'), {
				target: { value: 'Ethan' }
			});
			await fireEvent.change(getByPlaceholderText('Email address'), {
				target: { value: 'test@gmail.com' }
			});
			await fireEvent.change(getByPlaceholderText('Password'), {
				target: { value: 'test1234' }
			});

			await fireEvent.submit(getByTestId('signup'));
			// Triggers firebase().auth().signInWithEmailAndPassword() but we mocked it
			// with a fake resolved promise
			expect(doesUsernameExist).toHaveBeenCalled();
			expect(doesUsernameExist).toHaveBeenCalledWith('test');
			//Relies on other async code to finish must wait for this to be called
			await waitFor(() => {
				expect(mockHistoryPush).toHaveBeenCalledWith(ROUTES.DASHBOARD);
				expect(getByPlaceholderText('Email address').value).toBe(
					'test@gmail.com'
				);
				expect(getByPlaceholderText('Password').value).toBe('test1234');
				expect(getByPlaceholderText('Username').value).toBe('test');
				expect(getByPlaceholderText('Full name').value).toBe('Ethan');
				// Using queryByTestId throws error if not found
				expect(queryByTestId('error')).toBeFalsy();
			});
		});
	});
	//Else condition for username does already exist
	it('renders the sign up page but an error is present (username exists)', async () => {
		const firebase = {
			auth: jest.fn(() => ({
				createUserWithEmailAndPassword: jest.fn(() => ({
					user: {
						updateProfile: jest.fn(() => Promise.resolve({}))
					}
				}))
			}))
		};
		const { getByTestId, getByPlaceholderText, queryByTestId } = render(
			<Router>
				<FirebaseContext.Provider value={{ firebase }}>
					<SignUp />
				</FirebaseContext.Provider>
			</Router>
		);
		// It's responsible for flushing all effects and rerenders after invoking it.
		await act(async () => {
			// error where user name exists, we don't need to mock collection() from firebase
			// because it will never reach that line
			await doesUsernameExist.mockImplementation(() =>
				Promise.resolve([false])
			);
			expect(document.title).toEqual('Sign Up - Instagram');
			await fireEvent.change(getByPlaceholderText('Username'), {
				target: { value: 'test' }
			});
			await fireEvent.change(getByPlaceholderText('Full name'), {
				target: { value: 'Ethan' }
			});
			await fireEvent.change(getByPlaceholderText('Email address'), {
				target: { value: 'test@gmail.com' }
			});
			await fireEvent.change(getByPlaceholderText('Password'), {
				target: { value: 'test1234' }
			});

			await fireEvent.submit(getByTestId('signup'));
			// Triggers firebase().auth().signInWithEmailAndPassword() but we mocked it
			// with a fake resolved promise
			expect(doesUsernameExist).toHaveBeenCalled();
			expect(doesUsernameExist).toHaveBeenCalledWith('test');
			//Relies on other async code to finish must wait for this to be called
			await waitFor(() => {
				expect(mockHistoryPush).not.toHaveBeenCalledWith(ROUTES.DASHBOARD);
				expect(getByPlaceholderText('Email address').value).toBe('');
				expect(getByPlaceholderText('Password').value).toBe('');
				expect(getByPlaceholderText('Username').value).toBe('');
				expect(getByPlaceholderText('Full name').value).toBe('');
				// Using queryByTestId throws error if not found
				expect(queryByTestId('error')).toBeTruthy();
			});
		});
	});
	// Any other thrown error/ promise rejection to test the catch block
	//  In this case reject the updateProfile call
	it('renders the sign up page but an error is thrown', async () => {
		const firebase = {
			auth: jest.fn(() => ({
				createUserWithEmailAndPassword: jest.fn(() => ({
					user: {
						updateProfile: jest.fn(() =>
							Promise.reject(new Error('Username exists'))
						)
					}
				}))
			}))
		};
		const { getByTestId, getByPlaceholderText, queryByTestId } = render(
			<Router>
				<FirebaseContext.Provider value={{ firebase }}>
					<SignUp />
				</FirebaseContext.Provider>
			</Router>
		);
		// It's responsible for flushing all effects and rerenders after invoking it.
		await act(async () => {
			// error where user name exists, we don't need to mock collection() from firebase
			// because it will never reach that line
			await doesUsernameExist.mockImplementation(() =>
				Promise.resolve(false)
			);
			expect(document.title).toEqual('Sign Up - Instagram');
			await fireEvent.change(getByPlaceholderText('Username'), {
				target: { value: 'test' }
			});
			await fireEvent.change(getByPlaceholderText('Full name'), {
				target: { value: 'Ethan' }
			});
			await fireEvent.change(getByPlaceholderText('Email address'), {
				target: { value: 'test@gmail.com' }
			});
			await fireEvent.change(getByPlaceholderText('Password'), {
				target: { value: 'test1234' }
			});

			await fireEvent.submit(getByTestId('signup'));
			// Triggers firebase().auth().signInWithEmailAndPassword() but we mocked it
			// with a fake resolved promise
			expect(doesUsernameExist).toHaveBeenCalled();
			expect(doesUsernameExist).toHaveBeenCalledWith('test');
			//Relies on other async code to finish must wait for this to be called
			await waitFor(() => {
				expect(mockHistoryPush).not.toHaveBeenCalledWith(ROUTES.DASHBOARD);
				expect(getByPlaceholderText('Email address').value).toBe('');
				expect(getByPlaceholderText('Password').value).toBe('');
				expect(getByPlaceholderText('Username').value).toBe('');
				expect(getByPlaceholderText('Full name').value).toBe('');
				// Using queryByTestId throws error if not found
				expect(queryByTestId('error')).toBeTruthy();
			});
		});
	});
});
