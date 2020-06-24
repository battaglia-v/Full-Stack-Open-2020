

describe('Blog App', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Vincent Battaglia',
      username: 'vbattaglia',
      password: 'battaglia'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })
  it('Login form is shown on default', function() {
    cy.contains('login').click()
  })
})

describe('Login', function() {
  it('succeeds with correct credentials', function() {
    cy.contains('login').click()
    cy.get('#username').type('vbattaglia')
    cy.get('#password').type('battaglia')
    cy.get('#login-button').click()

    cy.contains('Vincent Battaglia is logged in')

  })

  it('fails with wrong credentials', function() {
    cy.contains('logout').click()
    cy.contains('login').click()
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()

    cy.get('.error')
      .should('contain', 'wrong username or password')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
  })
})

describe('Creating a new blog post', function() {
  beforeEach(function() {
    cy.login({ username: 'vbattaglia', password: 'battaglia' })

  })

  it('A blog can be created', function(){
    cy.contains('new blog post').click()
    cy.get('.title').type('How to become a savvy React Developer, and understand the code!')
    cy.get('.author').type('Ronald Williams')
    cy.get('.url').type('www.reactdeveloper.com')
    cy.get('#create').click()

    cy.get('.positive')
      .should('contain', 'the new blog: How to become a savvy React Developer, and understand the code! by Ronald Williams was added')

  })

  it('User can like a blog', function(){
    cy.contains('view').click()
    cy.contains('like').click()

  })
})

describe('Deleting a blog post', function() {
  it('user can delete a blog which they created', function() {
    cy.contains('new blog post').click()
    cy.get('.title').type('Testing is a very important part of application development')
    cy.get('.author').type('Joyce Williams')
    cy.get('.url').type('www.testingwithcypress.com')
    cy.get('#create').click()

    cy.contains('view').click()
    cy.contains('delete').click()

    cy.get('.error')
      .should('contain', 'the blog: Testing is a very important part of application development by Joyce Williams was deleted')

  })
})

describe('Sort the posts based on likes', function() {
  it('check that the blog with the most likes is sorted first', function() {
    cy.contains('new blog post').click()
    cy.get('.title').type('1')
    cy.get('.author').type('Joyce Williams')
    cy.get('.url').type('1')
    cy.get('#create').click()

    cy.contains('new blog post').click()
    cy.get('.title').type('2')
    cy.get('.author').type('Joyce Williams')
    cy.get('.url').type('2')
    cy.get('#create').click()

    cy.contains('new blog post').click()
    cy.get('.title').type('3')
    cy.get('.author').type('Joyce Williams')
    cy.get('.url').type('3')
    cy.get('#create').click()

    cy.contains('view').click()
    cy.contains('like').click()

    // cy.contains('likes')
    //   .should('contain', '2')

    cy.get('.likes').then(likes => {
      expect(likes[0].innerText).to.equal('1 likes like')
    })
  })
})