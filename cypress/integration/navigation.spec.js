describe('Navigation', () => {
  it('Should visit root', () => {
    cy.visit('/');
  });
  it('Should navigate to Tuesday', () => {
    cy.contains('li', "Tuesday")
    .click()
    .should('have.css', 'background-color', 'rgb(242, 242, 242)')
  })
});