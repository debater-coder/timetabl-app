/// <reference types="cypress" />

describe("Timetabl", () => {
  it("can login", () => {
    cy.visit("/");
    cy.contains("Login with SBHS").should("be.visible").click();
    cy.url()
      .should(
        "include",
        "/authorize.html?response_type=code&client_id=timetabldev&state="
      )
      .should(
        "include",
        "&scope=all-ro&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&code_challenge="
      )
      .should("include", "&code_challenge_method=S256")
      .then((url) => {
        const state = new URLSearchParams(url).get("state");
        cy.visit(`/?code=f11e4682f10781dc9f52ff30737be53b&state=${state}`);
      });
  });
});
