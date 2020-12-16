describe('Should book an interview', () => {
  it("Should book an interview", () => {
    cy.visit('/');
    cy.contains("Monday");
  })
})