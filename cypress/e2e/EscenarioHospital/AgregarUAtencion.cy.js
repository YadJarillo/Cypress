const { _ } = Cypress;
//Rol Cliente Admin - Usuarios de atención
describe("Sección Usuarios de atención - Scope Cliente admin", () => {
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

    cy.visit(Cypress.env("backoffice_url") + "/managment/response-team-users");
    cy.contains("Incident Responder List");

    cy.intercept({
      url: Cypress.env("backoffice_api_url") + "/response-teams-users",
      method: "POST",
    }).as("actionResponseTeamUserPOST");

    cy.intercept({
      url: Cypress.env("backoffice_api_url") + "/response-teams-users/*",
      method: "PUT",
    }).as("actionResponseTeamUserPUT");

    cy.intercept({
      url: Cypress.env("backoffice_api_url") + "/users/*",
      method: "DELETE",
    }).as("actionResponseTeamUserDELETE");
  });

  //Agregar Usuario de atención
  it("Añadir usuario de atención", () => {
    const REQUEST_DATA = {
      active: true,
      email: "anakarenro17@test.com",
      external: false,
      first_name: "Karen",
      last_name: "Testing",
      phone: {country_code: "52", area_code: "246", number: "7485962"},
      area_code: "246",
      country_code: "52",
      number: "7485962",
      settings: {skills: ""},
      teams: [{
          id: "fcd08b9d-cb00-4eae-8a93-914221fe97d2", 
          name: "Team No borrar"}], 
    };
    const RESPONSE_DATA = {
      first_name: "Karen",
      last_name: "Testing",
      email: "anakarenro17@test.com",
      phoneId: "459ae168-6148-4b17-9fbb-7860610a2121",
      password: "$2b$10$EZn2/QiToJFkrUSCAwVCWum4witzEjTHZp5wLd9Xr5hLuU7e8uap2",
      role: "INCIDENT_RESPONDER",
      setting: {
          skills: ""
      },
      countryId: null,
      clientId: "83382a14-06b4-4e26-babe-00024720fae9",
      phone: {
          id: "459ae168-6148-4b17-9fbb-7860610a2121",
          country_code: "52",
          area_code: "246",
          number: "7485962",
          full_number: ""
      },
      country: {
          id: null
      },
      client: {
          id: "83382a14-06b4-4e26-babe-00024720fae9"
      },
      email_app: null,
      verified_at: null,
      deleted_at: null,
      sectionId: null,
      // id: "fa493b7e-7db0-485e-844b-15280fcde7ad",
      active: true,
      teams: [
          {
              id: "fcd08b9d-cb00-4eae-8a93-914221fe97d2"
          }
      ]  
    };
    const TYPED_DATA = [
      { field: "teams", value: "Team No borrar", type: "select2" },
      { field: "first_name", value: "Karen", type: "input" },
      { field: "last_name", value: "Testing", type: "input" },
      { field: "email", value: "anakarenro17@test.com", type: "input" },
      {
        field: "phone.country_code.value",
        value: "+52 | Mexico",
        type: "select",
      },
      { field: "phone.area_code", value: "246", type: "input" },
      { field: "phone.number", value: "7485962", type: "input" },
    ];

    cy.get(".fa-plus").should("have.length", 1).click({ force: true });
    cy.get(".fa-plus")
      .closest(".dropdown")
      .find("button")
      .first()
      .click({ force: true });
    cy.get(".modal-title").should("be.visible");
    cy.contains("Add Incident Responder").should("be.visible");

    cy.wait(3000);
    TYPED_DATA.forEach((data) => {
      cy.customType(data);
    });

    cy.get(".modal .fa-save")
      .click({ force: true })
      .wait("@actionResponseTeamUserPOST", { timeout: 20000 })
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
