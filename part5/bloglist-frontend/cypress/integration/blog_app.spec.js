describe('Blog app', function () {
  let user
  let blog

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    user = {
      username: 'testuser',
      name: 'Test User',
      password: 'secret'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login').click()
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.login({ username: 'testuser', password: 'secret' })
      cy.contains(`${user.name} logged in`)
    })

    it('fails with wrong credentials', function () {
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

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'testuser', password: 'secret' })
      blog = {
        title: 'Test Title',
        author: 'John Smith',
        url: 'http://www.testurl.com'
      }
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type(blog.title)
      cy.get('#author').type(blog.author)
      cy.get('#url').type(blog.url)
      cy.get('#create-blog-button').click()

      cy.contains(`a new blog ${blog.title} by ${blog.author} added`)
      cy.contains(`${blog.title} ${blog.author}`)
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.addBlog(blog)
      })

      it.only('can be liked by a user', function() {
        cy.contains(`${blog.title} ${blog.author}`)
          .contains('view')
          .click()

        cy.contains('like').parent().as('likes')
        cy.get('@likes').contains('0')
        cy.get('@likes').find('button').click()
        cy.get('@likes').contains('1')
      })
    })
  })
})