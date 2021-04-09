import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Login from '../../pages/login';
import FirebaseContext from '../../context/firebase';
import { BrowserRouter as Router } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

// You can use your jest.fn functions within jest.mock() to compose them
//
const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useHistory: () => ({
		push: mockHistoryPush
	})
}));

describe('<Login/>', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});
	it('renders the login page with a form submission and logs the user in', async () => {
		const succeedToLogin = jest.fn(() => Promise.resolve('I am signed in!'));
		const firebase = {
			auth: jest.fn(() => ({
				signInWithEmailAndPassword: succeedToLogin
			}))
		};
		const { getByTestId, getByPlaceholderText, queryByTestId } = render(
			<Router>
				<FirebaseContext.Provider value={{ firebase }}>
					<Login />
				</FirebaseContext.Provider>
			</Router>
		);
		// It's responsible for flushing all effects and rerenders after invoking it.
		await act(async () => {
			expect(document.title).toEqual('Login - Instagram');
			// Placeholder attr of input elem
			await fireEvent.change(getByPlaceholderText('Email address'), {
				target: { value: 'test@gmail.com' }
			});
			await fireEvent.change(getByPlaceholderText('Password'), {
				target: { value: 'test1234' }
			});

			await fireEvent.submit(getByTestId('login'));
			// Triggers firebase().auth().signInWithEmailAndPassword() but we mocked it
			// with a fake resolved promise
			expect(succeedToLogin).toHaveBeenCalled();
			expect(succeedToLogin).toHaveBeenCalledWith('test@gmail.com', 'test1234');
			//Relies on other async code to finish must wait for this to be called
			await waitFor(() => {
				expect(mockHistoryPush).toHaveBeenCalledWith(ROUTES.DASHBOARD);
				expect(getByPlaceholderText('Email address').value).toBe(
					'test@gmail.com'
				);
				expect(getByPlaceholderText('Password').value).toBe('test1234');
				// Using queryByTestId throws error if not found
				expect(queryByTestId('error')).toBeFalsy();
			});
		});
	});

	it('renders the login page with a form submission and fails to login the user', async () => {
		const failToLogin = jest.fn(() =>
			Promise.reject(new Error('Sign in failed!'))
		);
		const firebase = {
			auth: jest.fn(() => ({
				signInWithEmailAndPassword: failToLogin
			}))
		};
		const { getByTestId, getByPlaceholderText, queryByTestId } = render(
			<Router>
				<FirebaseContext.Provider value={{ firebase }}>
					<Login />
				</FirebaseContext.Provider>
			</Router>
		);
		// It's responsible for flushing all effects and rerenders after invoking it.
		await act(async () => {
			expect(document.title).toEqual('Login - Instagram');
			// Placeholder attr of input elem
			await fireEvent.change(getByPlaceholderText('Email address'), {
				target: { value: 'testgmail.com' }
			});
			await fireEvent.change(getByPlaceholderText('Password'), {
				target: { value: 'test1234' }
			});

			await fireEvent.submit(getByTestId('login'));
			// Triggers firebase().auth().signInWithEmailAndPassword() but we mocked it
			// with a fake resolved promise
			expect(failToLogin).toHaveBeenCalled();
			expect(failToLogin).toHaveBeenCalledWith('testgmail.com', 'test1234');
			//Relies on other async code to finish must wait for this to be called
			await waitFor(() => {
				expect(mockHistoryPush).not.toHaveBeenCalledWith(ROUTES.DASHBOARD);
				expect(getByPlaceholderText('Email address').value).toBe('');
				expect(getByPlaceholderText('Password').value).toBe('');
				// Using queryByTestId throws error if not found
				expect(queryByTestId('error')).toBeTruthy();
			});
		});
	});
});
