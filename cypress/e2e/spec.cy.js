
describe('Validación de correo registero', () => {
  it('Validar que el correo ingresado debe de tener un @ para ser valido', () => {
    cy.visit('http://167.71.99.250:4000/register')
    cy.get('#email').type('usuariodominio.com');
    cy.get("#register").click();
    const textoEsperado = 'REQUIRED';
    cy.get('#msg').should('be.visible').contains(textoEsperado);

  });
});


describe('Validacion de contraseña registero', () => {
  it('Verificar que la contraseña debe tener como minimo 5 caracteres', () => {
    cy.visit('http://167.71.99.250:4000/register')
    cy.get('#password').type('Prueba'); 
    cy.get('#password').invoke('val').should('have.length.at.least',5);
    cy.get("#register").click();
    const textoEsperado = 'REQUIRED';
    cy.get('#msg').should('be.visible').contains(textoEsperado);

  });
});


describe('Validación de contraseña registero', () => {
  it('Validar que la contraseña sea requerida', () => {
    cy.visit('http://167.71.99.250:4000/register')
    cy.get('#email').type('usuario@dominio.com'); 
    cy.get('#email').invoke('val').should('include', '@');
     cy.get("#register").click();
    const textoEsperado = 'REQUIRED';
    cy.get('#msg').should('be.visible').contains(textoEsperado); 

  });
});

describe('Validación de correo registero', () => {
  it('Validar que el correo sea requerido', () => {
    cy.visit('http://167.71.99.250:4000/register')
    cy.get('#email').type('usuario@dominio.com'); 
    cy.get('#email').invoke('val').should('include', '@');
    cy.get("#register").click();
    const textoEsperado = 'REQUIRED';
    cy.get('#msg').should('be.visible').contains(textoEsperado); 

  });
});

describe('Validación de flujo completo exitoso registero', () => {
  it('Validar el flujo completo con las caracteristicas requeridas', () => {
    cy.visit('http://167.71.99.250:4000/register')
    cy.get('#email').type('usuario@dominio.com'); 
    cy.get('#email').invoke('val').should('include', '@');
    cy.get('#password').type('Prueba');
    cy.get('#password').invoke('val').should('have.length.at.least', 5);
    cy.get("#register").click();
    const textoEsperado = 'SAVED';
    cy.get('#msg').should('be.visible').contains(textoEsperado); 

  });
});



describe('Validación de flujo completo contraseña invalida registero', () => {
  it('Validar el flujo completo con una contraseña que no cumple las caracteristicas ', () => {
    cy.visit('http://167.71.99.250:4000/register')
    cy.get('#email').type('usuario@dominio.com'); 
    cy.get('#email').invoke('val').should('include', '@');
    cy.get('#password').type('Prue');
    cy.get("#register").click();
    const textoEsperado = 'INVALID';
    cy.get('#msg').should('be.visible').contains(textoEsperado); 

  });
});

describe('Validación de flujo completo email invalida registero', () => {
  it('Validar el flujo completo con un email que no cumple las caracteristicas ', () => {
    cy.visit('http://167.71.99.250:4000/register')
    cy.get('#email').type('usuariodominio.com'); 
    cy.get('#password').type('Prueba');
    cy.get('#password').invoke('val').should('have.length.at.least', 5);
    cy.get("#register").click();
    const textoEsperado = 'INVALID';
    cy.get('#msg').should('be.visible').contains(textoEsperado); 

  });
});

describe('Validación de flujo completo email y contraseña invalida registero', () => {
  it('Validar el flujo completo con un email que no cumple las caracteristicas ', () => {
    cy.visit('http://167.71.99.250:4000/register')
    cy.get('#email').type('usuariodominio.com'); 
    cy.get('#password').type('Prue');
    cy.get("#register").click();
    const textoEsperado = 'INVALID';
    cy.get('#msg').should('be.visible').contains(textoEsperado); 

  });
});



describe('Validación de correo login', () => {
  it('Validar que el correo ingresado debe de tener un @ para ser valido', () => {
    cy.visit('http://167.71.99.250:4000/login')
    cy.get('#email').type('usuariodominio.com');
    cy.get("#login").click();
    const textoEsperado = 'REQUIRED';
    cy.get('#msg').should('be.visible').contains(textoEsperado);

  });
});


describe('Validacion de contraseña login', () => {
  it('Verificar que la contraseña debe tener como minimo 5 caracteres', () => {
    cy.visit('http://167.71.99.250:4000/login')
    cy.get('#password').type('Prueba'); 
    cy.get('#password').invoke('val').should('have.length.at.least',5);
    cy.get("#login").click();
    const textoEsperado = 'REQUIRED';
    cy.get('#msg').should('be.visible').contains(textoEsperado);

  });
});


describe('Validación de contraseña login', () => {
  it('Validar que la contraseña sea requerida', () => {
    cy.visit('http://167.71.99.250:4000/login')
    cy.get('#email').type('usuario@dominio.com'); 
    cy.get('#email').invoke('val').should('include', '@');
     cy.get("#login").click();
    const textoEsperado = 'REQUIRED';
    cy.get('#msg').should('be.visible').contains(textoEsperado); 

  });
});

describe('Validación de correo login', () => {
  it('Validar que el correo sea requerido', () => {
    cy.visit('http://167.71.99.250:4000/login')
    cy.get('#email').type('usuario@dominio.com'); 
    cy.get('#email').invoke('val').should('include', '@');
    cy.get("#login").click();
    const textoEsperado = 'REQUIRED';
    cy.get('#msg').should('be.visible').contains(textoEsperado); 

  });
});

describe('Validación de flujo completo exitoso login', () => {
  it('Validar el flujo completo con las caracteristicas requeridas', () => {
    cy.visit('http://167.71.99.250:4000/login')
    cy.get('#email').type('usuario@dominio.com'); 
    cy.get('#email').invoke('val').should('include', '@');
    cy.get('#password').type('Prueba');
    cy.get('#password').invoke('val').should('have.length.at.least', 5);
    cy.get("#login").click();
    const textoEsperado = 'LOGIN VALID';
    cy.get('#msg').should('be.visible').contains(textoEsperado); 

  });
});



describe('Validación de flujo completo contraseña invalida login', () => {
  it('Validar el flujo completo con una contraseña que no cumple las caracteristicas ', () => {
    cy.visit('http://167.71.99.250:4000/login')
    cy.get('#email').type('usuario@dominio.com'); 
    cy.get('#email').invoke('val').should('include', '@');
    cy.get('#password').type('Prue');
    cy.get("#login").click();
    const textoEsperado = 'LOGIN INVALID';
    cy.get('#msg').should('be.visible').contains(textoEsperado); 

  });
});

describe('Validación de flujo completo email invalida login', () => {
  it('Validar el flujo completo con un email que no cumple las caracteristicas ', () => {
    cy.visit('http://167.71.99.250:4000/login')
    cy.get('#email').type('usuariodominio.com'); 
    cy.get('#password').type('Prueba');
    cy.get('#password').invoke('val').should('have.length.at.least', 5);
    cy.get("#login").click();
    const textoEsperado = 'INVALID';
    cy.get('#msg').should('be.visible').contains(textoEsperado); 

  });
});

describe('Validación de flujo completo email y contraseña invalida login', () => {
  it('Validar el flujo completo con un email que no cumple las caracteristicas ', () => {
    cy.visit('http://167.71.99.250:4000/login')
    cy.get('#email').type('usuariodominio.com'); 
    cy.get('#password').type('Prue');
    cy.get("#login").click();
    const textoEsperado = 'INVALID';
    cy.get('#msg').should('be.visible').contains(textoEsperado); 

  });
});