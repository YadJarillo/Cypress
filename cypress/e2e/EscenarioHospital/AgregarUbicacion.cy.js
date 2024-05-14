const { _ } = Cypress;
//Rol Cliente Admin
describe("Sección ubicaciones - Scope Cliente admin", () => {
  beforeEach("Precondition: Rol cliente admin debe hacer login", () => {
    cy.session("loginClienteAdmin", () => {
      cy.visit(Cypress.env("backoffice_url"));
      cy.contains("Sign in to continue to Tellit.");

      //Inicio de sesión
      cy.get('input[name="email"]').type("masadmtellit@outlook.com");
      cy.get('input[name="password"]').type("4CJYSCRz");
      cy.get('button[type="submit"]').click();
      cy.contains("Home");
    });

    cy.visit(Cypress.env("backoffice_url") + "/managment/locations");
    cy.contains("Location List");

    cy.intercept({
      url: Cypress.env("backoffice_api_url") + "/locations",
      method: "POST",
    }).as("actionLocationPOST");    

    cy.intercept({
      url: Cypress.env("backoffice_api_url") + "/locations/*",
      method: "PUT",
    }).as("actionLocationPUT");

    cy.intercept({
      url: Cypress.env("backoffice_api_url") + "/locations/*",
      method: "DELETE",
    }).as("actionLocationDELETE");
  });

  //Agregar Ubicacion
  it("Añadir ubicacion", () => {
    const REQUEST_DATA = {
      description: "Ubicación",
      entityRelated: true,
      incidentSubtypeRelated: true,
      latitude: null,
      longitude: null,
      maxRadius: 0,
      name: "Testing ubi",
      position: {lat: 19.4009907, 
                lng: -99.1767005},
      restrictReportLocation: false,
      showLocationName: false,
      sort_order: 1,
      type: "STANDAR",   
    };
    const RESPONSE_DATA = {
      name: "Testing ubi",
      description: "Ubicación",
      sort_order: 1,
      type: "STANDAR",
      entityRelated: true,
      incidentSubtypeRelated: true,
      showLocationName: false,
      latitude: null,
      longitude: null,
      maxRadius: "0.00",
      restrictReportLocation: false,
      client: {
          id: "83382a14-06b4-4e26-babe-00024720fae9"
      },
      entityId: null,
      incidentSubtypeId: null,
      parentLocationId: null,
      updatesId: null,
      hasQuestions: false,
      questions: {},  
    };
    const TYPED_DATA = [
      { field: "name", value: "Testing ubi", type: "input" },
      { field: "description", value: "Ubicación", type: "input" },
      { field: "sort_order", value: "1", type: "input" },
      { field: "type", value: "STANDAR", type: "select" },
      { field: "entityRelated", value: true, type: "checkbox" },
      { field: "incidentSubtypeRelated", value: true, type: "checkbox" },
      { field: "", value: 'assets/test.png', type: "dropfile" }
    ];

    cy.get(".fa-plus").should("have.length", 1).click({ force: true });
    cy.get(".modal-title").should("be.visible");
    cy.contains("Add Location").should("be.visible");

    cy.wait(2000);
    TYPED_DATA.forEach((data) => {
      cy.customType(data);
    });

    cy.get(".modal .fa-save")
      .click({ force: true })
      .wait("@actionLocationPOST", { timeout: 20000 })
      .then((xhr) => {
        cy.log(JSON.stringify(xhr.response.body));
        
        const REQ_REQUEST = {...xhr.request.body}
        delete REQ_REQUEST.id;
        delete REQ_REQUEST.assetId
        cy.expect(REQUEST_DATA).to.deep.eq(REQ_REQUEST);

        cy.expect(xhr.response.statusCode).to.lt(300);

        let temp = _.merge(_.cloneDeep(xhr.response.body), RESPONSE_DATA);
        cy.expect(temp).to.deep.eq(xhr.response.body);
      });
  });
});