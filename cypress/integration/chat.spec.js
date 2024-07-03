describe('Chat Functionality', () => {
  before(() => {
    // Log in programmatically if necessary
    // This step assumes you have a login API or similar setup
    cy.visit('/login');
    cy.get('input[id="first"]').type('user@app.com'); // Replace with valid test email
    cy.get('input[id="password"]').type('password'); // Replace with valid test password
    cy.get('form').submit();
    cy.url().should('include', '/gatcha/QhMUFADip3rp81ygFdyP');
  });

  it('should send a new message', () => {
    cy.visit('/chat/7onqwJmH73U3ujPdurjb'); // Replace with the actual chat page URL

    const messageText = 'This is a test message';
    cy.get('input[placeholder="Type your message here..."]').type(messageText);
    cy.get('button.send-button').click();

    // Verify the new message appears in the message list
    cy.contains(messageText).should('be.visible');
  });

  it('should edit an existing message', () => {
    const newMessageText = 'This is an edited message';
    // Assuming the message to edit is the last one for simplicity
    cy.get('.bubble.right').last().contains('Edit').click();
    cy.get('.bubble.right').last().find('input').clear().type(newMessageText);
    cy.get('.bubble.right').last().contains('Save').click();

    // Verify the edited message appears in the message list
    cy.contains(newMessageText).should('be.visible');
  });

  it('should delete a message', () => {
    // Assuming the message to delete is the last one for simplicity
    cy.get('.bubble.right').last().contains('Delete').click();

    // Verify the message is removed from the message list
    cy.get('.bubble.right').last().should('not.exist');
  });
});
