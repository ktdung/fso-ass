describe('Blog app', () => {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    cy.visit('http://localhost:5173');
  });

  it('Login form is show', function () {
    cy.contains('log in to application');
    cy.contains('Login').click();
  });
});
