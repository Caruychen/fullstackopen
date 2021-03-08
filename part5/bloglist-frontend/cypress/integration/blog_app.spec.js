describe('Blog app', function() {
  let user

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    user = {
      username: 'testuser',
      name: 'Test User',
      password: 'secret'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login').click()
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('testuser')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()
      cy.contains(`logged in as ${user.name}`)
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('testuser')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.get('.error')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'logged in as')
    })
  })
})