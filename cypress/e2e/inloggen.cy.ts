describe('inloggen met dummie account', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173')

    cy.get('#first').type('testtest@test.nl')
    cy.get('#password').type('123456789')
    cy.get('#inlogKlik').click()
  })
})