import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Profile from '../../pages/profile';
import FirebaseContext from '../../context/firebase';
import UserContext from '../../context/user';
import { BrowserRouter as Router } from 'react-router-dom';
import userFixture from '../../fixtures/logged-in-user';
import timelinePhotosFixture from '../../fixtures/timeline-photos';
import profileFollowedByLoggedInUser from '../../fixtures/profile-followed-by-loggedin-user';
import profileNotFollowedByLoggedInUser from '../../fixtures/profile-not-followed-by-logged-in-user';
import * as ROUTES from '../../constants/routes';

import {
	getUserPhotosByUsername,
	getUserByUsername,
	isUserFollowingProfile,
	toggleFollow
} from '../../services/firebase';
import useUser from '../../hooks/useUser';

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useHistory: () => ({
		push: mockHistoryPush
	}),
	useParams: () => ({ username: 'ethanny2' })
}));

jest.mock('../../services/firebase');
jest.mock('../../hooks/useUser.js');

describe('<Profile />', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});
	it('Renders profile page with logged in users profile; then signs out', async () => {
		const firebase = {
			auth: jest.fn(() => ({
				signOut: jest.fn(() => ({
					updateProfile: jest.fn(() => Promise.resolve({}))
				}))
			}))
		};
		await act(async () => {
			//Shouldn't this be orwell?
			getUserByUsername.mockImplementation(() => [userFixture]);
			getUserPhotosByUsername.mockImplementation(() => timelinePhotosFixture);
			useUser.mockImplementation(() => ({ user: userFixture }));
			const { getByText, getByTitle, debug } = render(
				<Router>
					<FirebaseContext.Provider value={{ firebase }}>
						<UserContext.Provider
							value={{
								user: {
									uid: 'HdWcrdn66BMMuDZs9iZOQsJ96ix2',
									displayName: 'Ethan'
								}
							}}
						>
							<Profile />
						</UserContext.Provider>
					</FirebaseContext.Provider>
				</Router>
			);
			await waitFor(() => {
				expect(mockHistoryPush).not.toHaveBeenCalled();
				expect(getUserByUsername).toHaveBeenCalledWith('ethanny2');
				expect(getByTitle('Sign Out')).toBeTruthy();
				expect(getByText('ethanny2')).toBeTruthy();
				expect(getByText('Ethan Soo Hon')).toBeTruthy();
				screen.getByText((content, node) => {
					const hasText = (node) => node.textContent === '5 photos';
					const nodeHasText = hasText(node);
					const childrenDontHaveText = Array.from(node.children).every(
						(child) => !hasText(child)
					);
					return nodeHasText && childrenDontHaveText;
				});
				screen.getByText((_, node) => {
					const hasText = (node) => node.textContent === '5 photos';
					const nodeHasText = hasText(node);
					const childrenDontHaveText = Array.from(node.children).every(
						(child) => !hasText(child)
					);
					return nodeHasText && childrenDontHaveText;
				});
				screen.getByText((_, node) => {
					const hasText = (node) => node.textContent === '3 followers';
					const nodeHasText = hasText(node);
					const childrenDontHaveText = Array.from(node.children).every(
						(child) => !hasText(child)
					);
					return nodeHasText && childrenDontHaveText;
				});

				screen.getByText((_, node) => {
					const hasText = (node) => node.textContent === '1 following';
					const nodeHasText = hasText(node);
					const childrenDontHaveText = Array.from(node.children).every(
						(child) => !hasText(child)
					);
					return nodeHasText && childrenDontHaveText;
				});
			});
			fireEvent.click(getByTitle('Sign Out'));
			expect(mockHistoryPush).toHaveBeenCalledWith(ROUTES.LOGIN);
			fireEvent.keyDown(getByTitle('Sign Out'), {
				key: 'Enter'
			});
		});
	});
	it('renders the profile page with a user profile with 1 follower', async () => {
		await act(async () => {
			userFixture.followers = ['2']; // put followers to 1
			getUserByUsername.mockImplementation(() => [userFixture]);
			getUserPhotosByUsername.mockImplementation(() => timelinePhotosFixture);
			useUser.mockImplementation(() => ({
				user: userFixture,
				followers: ['2']
			}));

			const { getByText, getByTitle } = render(
				<Router>
					<FirebaseContext.Provider
						value={{
							firebase: {
								auth: jest.fn(() => ({
									signOut: jest.fn(() => ({
										updateProfile: jest.fn(() => Promise.resolve({}))
									}))
								}))
							}
						}}
					>
						<UserContext.Provider
							value={{
								user: {
									uid: 'HdWcrdn66BMMuDZs9iZOQsJ96ix2',
									displayName: 'Ethan'
								}
							}}
						>
							<Profile />
						</UserContext.Provider>
					</FirebaseContext.Provider>
				</Router>
			);

			await waitFor(() => {
				expect(mockHistoryPush).not.toHaveBeenCalledWith(ROUTES.NOT_FOUND);
				expect(getUserByUsername).toHaveBeenCalled();
				expect(getUserByUsername).toHaveBeenCalledWith('ethanny2');
				expect(getByTitle('Sign Out')).toBeTruthy();
				expect(getByText('ethanny2')).toBeTruthy();
				expect(getByText('Ethan Soo Hon')).toBeTruthy();
				screen.getByText((_, node) => {
					const hasText = (node) => node.textContent === '1 follower';
					const nodeHasText = hasText(node);
					const childrenDontHaveText = Array.from(node.children).every(
						(child) => !hasText(child)
					);
					return nodeHasText && childrenDontHaveText;
				});
			});
		});
	});

	it('renders the profile page with a user profile and logged in and unfollows a user', async () => {
		await act(async () => {
			isUserFollowingProfile.mockImplementation(() => true);
			useUser.mockImplementation(() => ({ user: userFixture }));
			getUserByUsername.mockImplementation(() => [
				profileFollowedByLoggedInUser
			]);
			getUserPhotosByUsername.mockImplementation(() => false); // falsy photos

			const { getByText, getByTitle } = render(
				<Router>
					<FirebaseContext.Provider
						value={{
							firebase: {
								auth: jest.fn(() => ({
									signOut: jest.fn(() => ({
										updateProfile: jest.fn(() => Promise.resolve({}))
									}))
								}))
							}
						}}
					>
						<UserContext.Provider
							value={{
								user: {
									uid: 'HdWcrdn66BMMuDZs9iZOQsJ96ix2',
									displayName: 'Ethan'
								}
							}}
						>
							<Profile />
						</UserContext.Provider>
					</FirebaseContext.Provider>
				</Router>
			);

			await waitFor(() => {
				expect(mockHistoryPush).not.toHaveBeenCalledWith(ROUTES.NOT_FOUND);
				expect(getUserByUsername).toHaveBeenCalled();
				// I mocked the user params at the top with my username,
				// but the mocked function returns orwell.
				expect(getUserByUsername).toHaveBeenCalledWith('ethanny2');
				expect(getByTitle('Sign Out')).toBeTruthy();
				expect(getByText('orwell')).toBeTruthy();
				expect(getByText('George Orwell')).toBeTruthy();
				fireEvent.click(getByText('Unfollow'));
			});
		});
	});
	it('renders the profile page but there is no user so redirect happens', async () => {
		await act(async () => {
			getUserByUsername.mockImplementation(() => []);
			getUserPhotosByUsername.mockImplementation(() => []);
			useUser.mockReturnValue(null);
			const { debug } = render(
				<Router>
					<FirebaseContext.Provider value={{}}>
						<UserContext.Provider
							value={{
								user: {
									uid: 'HdWcrdn66BMMuDZs9iZOQsJ96ix2',
									displayName: 'Ethan'
								}
							}}
						>
							<Profile />
						</UserContext.Provider>
					</FirebaseContext.Provider>
				</Router>
			);
			debug(undefined, 30000);
			await waitFor(() => {
				expect(mockHistoryPush).toHaveBeenCalledWith(ROUTES.NOT_FOUND);
			});
		});
	});
});
