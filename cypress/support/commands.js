// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Dalam support/commands.js
Cypress.Commands.add('accessToken', () => {
    cy.request({
        method: 'POST',
        url: '/login', // Ganti URL dengan URL login yang sesuai
        body: {
          username: 'mudo',
          password: 'test123',
        },
      }).then((loginResponse) => {
        expect(loginResponse.status).to.eq(200)
        expect(loginResponse.body.data).to.have.property('token')
        const token = loginResponse.body.data.token
        cy.log("Token: " + token)
      
        // Simpan token dalam variabel untuk digunakan dalam permintaan berikutnya
        Cypress.env('accessToken', token)
      })
})