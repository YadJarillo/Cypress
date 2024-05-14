const { _ } = Cypress;
//Rol Cliente Admin
describe("Sección SubAdmins - Scope Cliente admin", () => {
  beforeEach("Precondition: Rol cliente admin debe hacer login", () => {
    cy.session("loginClienteAdmin", () => {
      cy.visit(Cypress.env("backoffice_url"));
      cy.contains("Inicio de sesion");
      
      
     cy.get('input[name="email"]').type("Admin.hospital@test.com");
     cy.get('input[name="password"]').type("@n9EivUv");
     cy.get('button[type="submit"]').click();
     // Assertions
     cy.contains("Home");
  });

  
  cy.visit(Cypress.env("backoffice_url") + "/managment/subadmins");
  cy.contains("SubAdmin Lista");
});

//Agregar SubAdmin
it("Añadir SubAdmin", () => {
  const REQUEST_DATA = {
    active: true,
    email: "subadmin.marialopes@test.com",
    first_name: "SubAdmin ",
    last_name: "Maria Lopez",  
  };
  const RESPONSE_DATA = {
    first_name: "SubAdmin ",
    last_name: "Maria Lopez",
    email: "subadmin.marialopes@test.com",
    role: "SUB_ADMIN",
    countryId: null,
    clientId: "83382a14-06b4-4e26-babe-00024720fae9",
    country: {
        id: null
    },
    client: {
        id: "83382a14-06b4-4e26-babe-00024720fae9"
    },
    email_app: null,
    phoneId: null,
    verified_at: null,
    settings: {},
    deleted_at: null,
    sectionId: null,
    id: "eea6670f-d664-4eeb-b19a-f2b428735c1b",
    active: true,  
  };
  const TYPED_DATA = [
    { field: "first_name", value: "SubAdmin", type: "input" },
    { field: "last_name", value: "TMaria Lopez", type: "input" },
    { field: "email", value: "subadmin.marialopes@test.com", type: "input" },
    { field: "active", value: true, type: "checkbox" }
  ];

  cy.get(".fa-plus").should("have.length", 1).click({ force: true });
  cy.get(".modal-title").should("be.visible");
  cy.contains("Add SubAdmin").should("be.visible");

  cy.wait(2000);
  TYPED_DATA.forEach((data) => {
    cy.customType(data);
  });

  cy.get(".modal .fa-save")
    .click({ force: true })
    .wait("@actionSubadminPOST", { timeout: 20000 })
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
