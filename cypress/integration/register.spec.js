describe('Registration Page', () => {
  it('registers a new user and redirects to the gatcha page', () => {
    cy.visit('/aanmelden');

    cy.get('input[id="username"]').type('testuser'); // Replace with a valid test username
    cy.get('input[id="email"]').type('testuser@example.com'); // Replace with a valid test email
    cy.get('input[id="password"]').type('password123'); // Replace with a valid test password
    cy.get('input[id="passwordRepeat"]').type('password123'); // Repeat the password


    cy.get('form').submit();

    cy.url().should('include', '/gatcha/QhMUFADip3rp81ygFdyP');
  });
});
