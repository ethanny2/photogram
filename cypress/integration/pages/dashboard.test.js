/* eslint-disable no-undef */
/*  https://nickymeuleman.netlify.app/blog/gui-on-wsl2-cypress/ */
describe('Dashboard', () => {
	beforeEach(() => {
		cy.visit(`${Cypress.config().baseUrl}/login`);
		cy.get('body').within(() => {
			cy.get('div').should('contain.text', "Don't have an account?");
		});
		cy.get('div')
			.find('img')
			.should('be.visible')
			.should('have.attr', 'alt')
			.should('contain', 'iPhone with Instagram app');
		cy.get('form').within(() => {
			cy.get('input:first')
				.should('have.attr', 'placeholder', 'Email address')
				.type('ethanny2@gmail.com');
			cy.get('input:last')
				.should('have.attr', 'placeholder', 'Password')
				.type('helloworld11');
			cy.get('button').should('contain.text', 'Login');
			cy.get('button').click();
			cy.wait(7000);
			// cy.get('body').find('img').first()
			// 	.should('be.visible')
			// 	.should('have.attr', 'alt')
			// 	.should('contain', 'Instagram logo');
		});
	});
	it('logs the user in and shows the dashboard and does basic checks around the UI', () => {
		cy.get('body').within(() => {
			cy.get('div').should('contain.text', 'ethanny2'); // username in the sidebar
			cy.get('div').should('contain.text', 'Ethan Soo Hon'); // full name in the sidebar
			cy.get('div').should('contain.text', 'Suggestions for you'); // if user has suggestions
		});
	});
	it('logs the user in and add a comment to a photo', () => {
		cy.get('[data-testid="add-comment-l0lt3pVw538yNxazwwAL]')
			.should('have.attr', 'placeholder', 'Add a comment...')
			.type('Amazing photo!');
		cy.get('[data-testid="submit-comment-l0lt3pVw538yNxazwwAL"]').submit();
	});
	it('logs the user in and likes a photo', () => {
		cy.get('[data-testid="like-photo-l0lt3pVw538yNxazwwAL"]').click();
	});

	it('logs the user in and then signs out', () => {
		cy.get('[data-testid="sign-out"]').click();
		cy.wait(1000);
		cy.get('div').should('contain.text', "Don't have an account? Sign up"); // back on the login page
	});
});
