const { _ } = Cypress;
//Rol Cliente Admin - Equipos
describe("Sección Equipos - Scope Cliente admin", () => {
  beforeEach("Precondition: Rol cliente admin debe hacer login", () => {
    cy.session("loginClienteAdmin", () => {
      cy.visit(Cypress.env("backoffice_url"));

      //Inicio de sesión
      cy.get('input[name="email"]').type("Admin.hospital@test.com");
      cy.get('input[name="password"]').type("@n9EivUv");
      cy.get('button[type="submit"]').click();
    });

    cy.visit(Cypress.env("backoffice_url") + "/managment/response-teams");
    cy.contains("Response Team List");

    cy.intercept({
      url: Cypress.env("backoffice_api_url") + "/response-teams",
      method: "POST",
    }).as("actionResponseTeamPOST"); 

    cy.intercept({
      url: Cypress.env("backoffice_api_url") + "/response-teams/*",
      method: "PUT",
    }).as("actionResponseTeamPUT");

    cy.intercept({
      url: Cypress.env("backoffice_api_url") + "/response-teams/*",
      method: "DELETE",
    }).as("actionResponseTeamDELETE");
  });

  //Agregar Equipos de atención
  it("Añadir Equipo de atención", () => {
    const REQUEST_DATA = {
      description: "Realiza pruebas",
      max_external: 0,
      max_internal: 1,
      min_external: 0,
      min_internal: 1,
      name: "Testing",  
    };
    const RESPONSE_DATA = {
      name: "Testing",
      description: "Realiza pruebas",
      min_internal: 1,
      max_internal: 1,
      min_external: 0,
      max_external: 0,
      clientId: "83382a14-06b4-4e26-babe-00024720fae9",
      client: {
          id: "83382a14-06b4-4e26-babe-00024720fae9"
      },
      // id: "99891899-441e-41d1-bf2c-7c5e6c176a55",  
    };
    const TYPED_DATA = [
      { field: "name", value: "Testing", type: "input" },
      { field: "description", value: "Realiza pruebas", type: "input" },
      { field: "min_internal", value: "1", type: "input" },
      { field: "max_internal", value: "1", type: "input" }
    ];

    cy.get(".fa-plus").should("have.length", 1).click({ force: true });
    cy.get(".modal-title").should("be.visible");
    cy.contains("Add Response Team").should("be.visible");

    cy.wait(2000);
    TYPED_DATA.forEach((data) => {
      cy.customType(data);
    });

    cy.get(".modal .fa-save")
      .click({ force: true })
      .wait("@actionResponseTeamPOST", { timeout: 20000 })
      .then((xhr) => {
        cy.log(JSON.stringify(xhr.response.body));
        const REQ_REQUEST = { ...xhr.request.body };
        delete REQ_REQUEST.id;

        cy.expect(REQUEST_DATA).to.deep.eq(REQ_REQUEST);
        cy.expect(xhr.response.statusCode).to.lt(300);

        let temp = _.merge(_.cloneDeep(xhr.response.body), RESPONSE_DATA);
        cy.expect(temp).to.deep.eq(xhr.response.body);
      });
  });
});
