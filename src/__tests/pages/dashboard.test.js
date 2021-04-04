import React from 'react';
import {
	render,
	screen,
	fireEvent,
	waitFor,
	getAllByText,
	getByPlaceholderText,
	prettyDOM
} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Dashboard from '../../pages/dashboard';
import FirebaseContext from '../../context/firebase';
import UserContext from '../../context/user';
import LoggedInUserContext from '../../context/logged-in-user';
import { BrowserRouter as Router } from 'react-router-dom';
import userFixture from '../../fixtures/logged-in-user';
import timelinePhotosFixture from '../../fixtures/timeline-photos';
import suggestedProfileFixture from '../../fixtures/suggested-profiles';
import {
	getUserFollowedPhotos,
	getSuggestedProfiles,
	updateUserFollowing,
	updateFollowedUserFollowers
} from '../../services/firebase';
import useUser from '../../hooks/useUser';
// const mockHistoryPush = jest.fn();
// jest.mock('react-router-dom', () => ({
// 	...jest.requireActual('react-router-dom'),
// 	useHistory: () => ({
// 		push: mockHistoryPush
// 	})
// }));

jest.mock('../../services/firebase');
jest.mock('../../hooks/useUser.js');

describe('<Dashboard />', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});
	it('renders the dashboard with a user profile and follows a user from the suggested profile sidebar', async () => {
		await act(async () => {
			getUserFollowedPhotos.mockImplementation(() => timelinePhotosFixture);
			getSuggestedProfiles.mockImplementation(() => suggestedProfileFixture);
			updateUserFollowing.mockImplementation(() => Promise.resolve(true));
			updateFollowedUserFollowers.mockImplementation(() =>
				Promise.resolve(true)
			);
			const firebase = {
				firestore: jest.fn(() => ({
					collection: jest.fn(() => ({
						doc: jest.fn(() => ({
							update: jest.fn(() => Promise.resolve('user updated'))
						}))
					}))
				}))
			};
			// const fieldValues = {
			const FieldValue = {
				arrayUnion: jest.fn(),
				arrayRemove: jest.fn()
			};
			// };
			// Here we mock the useUser hook that Header uses; whereas
			// in not-found-test.js we only mocked the firebase service call
			// used by the hook getUserByUserId. Here we mock the whole hook
			// Either method can be used
			useUser.mockImplementation(() => ({ user: userFixture }));
			const {
				getByText,
				debug,
				getByTitle,
				getAllByText,
				getByAltText,
				getByTestId,
				container
			} = render(
				<Router>
					<FirebaseContext.Provider value={{ firebase, FieldValue }}>
						<UserContext.Provider
							value={{
								user: {
									uid: 'HdWcrdn66BMMuDZs9iZOQsJ96ix2',
									displayName: 'Ethan'
								}
							}}
						>
							<LoggedInUserContext.Provider value={{ user: userFixture }}>
								<Dashboard
									user={{
										uid: 'HdWcrdn66BMMuDZs9iZOQsJ96ix2',
										displayName: 'Ethan'
									}}
								/>
							</LoggedInUserContext.Provider>
						</UserContext.Provider>
					</FirebaseContext.Provider>
				</Router>
			);
			await waitFor(async () => {
				expect(document.title).toBe('Instagram');
				expect(getByTitle('Sign Out')).toBeTruthy();
				// Multiple instances of this username b/c all timeline photos hardcoded as his
				expect(getAllByText('raphael')).toBeTruthy();
				expect(getByAltText('Instagram logo')).toBeTruthy(); //logo in header
				expect(getByAltText('ethanny2 profile')).toBeTruthy(); //alt text on img for my logged in profile
				expect(getAllByText('Saint George and the Dragon')).toBeTruthy(); //Caption for photos
				expect(getByText('Suggestions for you')).toBeTruthy(); //Sidebar text
				// Page renders like expected now try some clicking events

				//Reg click on like
				fireEvent.click(getByTestId('like-photo-494LKmaF03bUcYZ4xhNu'));
				expect(
					getByTestId('like-photo-494LKmaF03bUcYZ4xhNu').classList.contains(
						'fill-current'
					)
				).toBe(true);
				/* 
        Liking triggers this code
         firebase.firestore()
				.collection('photos')
				.doc(docId)
				.update({})
        How to assert this? : 
				Check the heart color / css class
        */
				// toggle like using keyboard
				fireEvent.click(getByTestId('like-photo-494LKmaF03bUcYZ4xhNu'), {
					key: 'Enter'
				});
				await expect(
					getByTestId('like-photo-494LKmaF03bUcYZ4xhNu').classList.contains(
						'fill-current text-red-500'
					)
				).toBe(false);
				fireEvent.click(getByTestId('focus-input-494LKmaF03bUcYZ4xhNu'));
				// console.log(getByTestId('focus-input-494LKmaF03bUcYZ4xhNu'));
				const commentBox = getByTestId('add-comment-494LKmaF03bUcYZ4xhNu');
				var isFocused = document.activeElement === commentBox;
				// // Test if the input DOM node has focus on it
				expect(isFocused).toBeTruthy();
				// // Another scenario add a comment to a photo
				fireEvent.change(getByTestId('add-comment-494LKmaF03bUcYZ4xhNu'), {
					target: { value: 'Test comment! RTL' }
				});
				// // Test to see if the comment worked
				fireEvent.submit(getByTestId('submit-comment-494LKmaF03bUcYZ4xhNu'));
				// /*
				// Also calls firestore().collection().update ...
				// But the comment should show up somewhere on the page because it is added
				// as the most recent. Why not get by text?
				// */
				expect(getByText('Test comment! RTL')).toBeTruthy();
				//Why does this exist down here only...
				const followBtn = screen.getByRole('button', { name: /Follow/i });
				// Only 1 user in the suggested
				fireEvent.click(getByText('Follow'));
				await expect(updateUserFollowing).toHaveBeenCalled();
				await expect(updateFollowedUserFollowers).toHaveBeenCalled();
			});
		});
	});
});
