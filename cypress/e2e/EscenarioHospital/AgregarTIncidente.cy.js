const { _ } = Cypress;
//Tipos de incidente
describe("Sección Tipo de incidente - Scope Cliente admin", () => {
  beforeEach("Precondition: Rol cliente admin debe hacer login", () => {
    cy.session("loginClienteAdmin", () => {
      cy.visit(Cypress.env("backoffice_url"));
      cy.contains("Sign in to continue to Tellit.");

      //Inicio de sesión 
      cy.get('input[name="email"]').type("Admin.hospital@test.com");
      cy.get('input[name="password"]').type("@n9EivUv");
      cy.get('button[type="submit"]').click();
      cy.contains("Home");
    });

    cy.visit(Cypress.env("backoffice_url") + "/managment/incident-types");
    cy.contains("Incident Type List");

    cy.intercept({
      url: Cypress.env("backoffice_api_url") + "/incident-types",
      method: "POST",
    }).as("actionIncidentTypePOST");        

    cy.intercept({
      url: Cypress.env("backoffice_api_url") + "/incident-types/*",
      method: "PUT",
    }).as("actionIncidentTypePUT");

    cy.intercept({
      url: Cypress.env("backoffice_api_url") + "/incident-types/*",
      method: "DELETE",
    }).as("actionIncidentTypeDELETE");
  });

  //Agregar Tipos de incidente
  it("Añadir Tipo de incidente", () => {
    const REQUEST_DATA = {
      autoSelectOnReportIncident: false,
      emergency: false,
      name: "TESTING1",
      sort_order: 1,
      type: "STANDAR",
    };
    const RESPONSE_DATA = {
      name: "TESTING1",
      sort_order: 1,
      type: "STANDAR",
      emergency: false,
      autoSelectOnReportIncident: false,
      assetId: "96138d55-112d-4b67-b969-d32c38ddc355",
      clientId: "83382a14-06b4-4e26-babe-00024720fae9",
      entityId: null,
      client: {
          id: "83382a14-06b4-4e26-babe-00024720fae9"
      },
      entity: {
          id: null
      },
      parentIncidentTypeId: null,
      updatesId: null,
      // id: "581bb6ce-5bde-4132-8e9f-15fa0f3cba67",  
    };
    const TYPED_DATA = [
      { field: "name", value: "TESTING1", type: "input" },
      { field: "sort_order", value: "1", type: "input" },
      { field: "type", value: "STANDAR", type: "select" },
      { field: "", value: 'assets/test.png', type: "dropfile" }
    ];

    cy.get(".fa-plus").should("have.length", 1).click({ force: true });
    cy.get(".modal-title").should("be.visible");
    cy.contains("Add Incident Type").should("be.visible");

    cy.wait(2000);
    TYPED_DATA.forEach((data) => {
      cy.customType(data);
    });
    cy.wait(2000);

    cy.get(".modal .fa-save")
      .click({ force: true })
      .wait("@actionIncidentTypePOST", { timeout: 2000 })
      .then((xhr) => {
        cy.log(JSON.stringify(xhr.response.body));
        
        const REQ_REQUEST = {...xhr.request.body}
        delete REQ_REQUEST.assetId
        delete REQ_REQUEST.id
        cy.expect(REQUEST_DATA).to.deep.eq(REQ_REQUEST);

        let temp = _.merge(_.cloneDeep(xhr.response.body), RESPONSE_DATA);
        cy.expect(temp).to.deep.eq(xhr.response.body);
      });
  });
});