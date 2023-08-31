describe('The play button work', () => {
  it('play button go to the game if we insert a name', () => {
    cy.visit('http://localhost:3000')
    cy.get("input")
    cy.get("button")
    cy.url().should("contain", "3000")
  })
})