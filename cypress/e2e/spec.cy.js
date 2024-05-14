describe("template spec", () => {
  it("Open backoffice login page", () => {
    // Steps
    cy.visit(Cypress.env("backoffice_url"));

    // Assertions
    cy.contains("Sign in to continue to Tellit.");
  });

  it("Check bad login", () => {
    cy.visit(Cypress.env("backoffice_url"));
    cy.contains("Sign in to continue to Tellit.");

    // Steps
    // Get an input, type into it
    cy.get('input[name="email"]').type("Admin.hospital@test.com");

    // Get an input, type into it
    cy.get('input[name="password"]').type("asdasdasd");

    // Get an input, type into it
    cy.get('button[type="submit"]').click();

    // Assertions
    cy.contains("Invalid credentials");
  });

  it("Check good login", () => {
    cy.visit(Cypress.env("backoffice_url"));

    // Steps
    cy.get('input[name="email"]').type("Admin.hospital@test.com");
    cy.get('input[name="password"]').type("@n9EivUv");
    cy.get('button[type="submit"]').click();

    // Assertions
    cy.contains("Home");
  });
});
