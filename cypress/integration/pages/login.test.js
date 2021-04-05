/* eslint-disable no-undef */
describe('Login', () => {
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
	});

	it('inputs the email address and password and submits the form', () => {
		cy.get('form').within(() => {
			cy.get('input:first')
				.should('have.attr', 'placeholder', 'Email address')
				.type('ethanny2@gmail.com');
			cy.get('input:last')
				.should('have.attr', 'placeholder', 'Password')
				.type('helloworld11');
		});
		cy.get('button').should('contain.text', 'Login').click();
		cy.wait(5000);
	});
	it('inputs the email address and password and submits the form with wrong info', () => {
		cy.get('form').within(() => {
			cy.get('button').should('be.disabled');
			cy.get('input:first')
				.should('have.attr', 'placeholder', 'Email address')
				.type('ethanny5@gmail.com');
			cy.get('input:last')
				.should('have.attr', 'placeholder', 'Password')
				.type('helloworld11');
			cy.get('button').should('not.be.disabled');
			cy.get('button').should('contain.text', 'Login');
			cy.get('button').click();
		});
		cy.get('body').within(() => {
			cy.get('div').should(
				'contain.text',
				'There is no user record corresponding to this identifier. The user may have been deleted.'
			);
		});
	});

	it('navigates to the sign up page and back again', () => {
		cy.get('a').should('contain.text', 'Sign up').click();
		cy.get('body').within(() => {
			cy.get('div').should('contain.text', 'Have an account?');
		});
		cy.get('a').should('contain.text', 'Log in').click();
		cy.get('body').within(() => {
			cy.get('div').should('contain.text', `Don't have an account?`);
		});
	});
});
