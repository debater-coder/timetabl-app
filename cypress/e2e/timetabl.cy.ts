/// <reference types="cypress" />

describe("Timetabl Landing page", () => {
  it("contains login button", () => {
    cy.visit("/");
    cy.contains("Login with SBHS");
  });
});
