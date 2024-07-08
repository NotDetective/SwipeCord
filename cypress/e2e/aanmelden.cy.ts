describe('dummie account aan maken', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173')

    cy.get('.maakAccount').click()
    cy.get('#username').type('testtest')
    cy.get('#email').type('testtest@test.nl')
    cy.get('#password').type('123456789')
    cy.get('#passwordRepeat').type('123456789')
    cy.get('#inloggenKnop').click()
  })
})