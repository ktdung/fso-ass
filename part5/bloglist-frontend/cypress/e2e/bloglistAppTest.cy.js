describe('Blog app', () => {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    cy.visit('http://localhost:5173');

    // create new user
    const user = {
      name: 'superadmin',
      username: 'root',
      password: 'root',
    };
    cy.request('POST', 'http://localhost:3003/api/users', user);
    cy.visit('http://localhost:5173');
  });

  it('Login form is show', function () {
    cy.contains('log in to application');
    cy.contains('Login').click();
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('root');
      cy.get('#password').type('root');
      cy.get('#login-button').click();

      cy.get('.notification')
        .should('contain', 'superadmin logged in')
        .and('have.css', 'color', 'rgb(0, 128, 0)');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('root');
      cy.get('#password').type('slfj');
      cy.get('#login-button').click();

      cy.get('.notification')
        .should(
          'contain',
          'Wrong username or password. Please try again.'
        )
        .and('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'root',
        password: 'root',
      }).then((response) => {
        localStorage.setItem(
          'loggedBlogappUser',
          JSON.stringify(response.body)
        );
        cy.visit('http://localhost:5173');
      });
    });

    it('A blog can be created', function () {
      cy.contains('new note').click();
      cy.get('#title').type('How to teach');
      cy.get('#author').type('kent c dodds');
      cy.get('#url').type('https://kentcdodds.com');
      cy.get('#create-blog').click();
      cy.contains('How to teach');
    });

    describe('and a blog exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'how to coding',
          author: 'anon',
          url: 'example.com',
          likes: 3,
        });
      });

      it('user like a blog', function () {
        cy.contains('View').click();
        cy.get('.like').click();
      });

      it('user who created the blog can delete it', function () {
        cy.contains('View').click();
        cy.get('.remove').click();
        cy.on('windows:confirm', () => true);
      });

      it('A blog cannot be deleted by a user who did not create the blog', function () {
        cy.contains('new note').click();
        cy.get('#title').type('test title');
        cy.get('#author').type('test author');
        cy.get('#url').type('test url');
        cy.get('#create-blog').click();
        cy.contains('Logout').click();
        cy.request('POST', 'http://localhost:3003/api/users', {
          username: 'blogtest2',
          name: 'Test User 2',
          password: 'blogpassword2',
        });
        cy.login({
          username: 'blogtest2',
          password: 'blogpassword2',
        });
        cy.contains('view').click();
        cy.get('html').should('not.contain', 'Remove');
      });
    });
  });
});
