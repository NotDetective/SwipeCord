describe('Login Page', () => {
  it('logs in with valid credentials and redirects to the gatcha page', () => {
    cy.visit('/'); // Adjust the URL path as necessary

    // Fill in the email and password
    cy.get('input[id="first"]').type('user@app.com'); // Replace with valid test email
    cy.get('input[id="password"]').type('password'); // Replace with valid test password

    // Submit the form
    cy.get('form').submit();

    // Verify the redirection to the gatcha page
    cy.url().should('include', '/gatcha/QhMUFADip3rp81ygFdyP');
  });
});
