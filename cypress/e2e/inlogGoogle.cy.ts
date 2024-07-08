describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173')

    cy.get('.login-with-google-btn').click()
  })
})