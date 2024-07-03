describe('Chat Functionality', () => {
  before(() => {
    cy.visit('/');
    cy.get('input[id="first"]').type('user@app.com');
    cy.get('input[id="password"]').type('password');
    cy.get('form').submit();
    cy.url().should('include', '/gatcha/QhMUFADip3rp81ygFdyP');
  });

  it('should send a new message', () => {
    cy.visit('/chat/7onqwJmH73U3ujPdurjb');

    const messageText = 'This is a test message';
    cy.get('input[placeholder="Type your message here..."]').type(messageText);
    cy.get('button.send-button').click();
    cy.get('.message-container').scrollTo('bottom');
    cy.contains(messageText).should('be.visible');
  });

});

