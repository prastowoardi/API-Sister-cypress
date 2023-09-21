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
        url: '/authorize', // Ganti URL dengan URL login yang sesuai
        body: {
          username: 'xL0iwi3tdZwJeXuJHGqc1ELKLAsipRtyDeEADhMXiEw=',
          password: 'EIwcMnQnmgRGL6ykrNdMj2ObZa+mfHlrm6sa8K9foyM4m6LATHF61XfUP1Wggkbe',
          id_pengguna: "ae938146-a935-43dc-ad53-e1c458da907f"
        },
      }).then((loginResponse) => {
        expect(loginResponse.status).to.eq(200)
        expect(loginResponse.body).to.have.property('token')
        const token = loginResponse.body.token
        cy.log("Token: " + token)
      
        // Simpan token dalam variabel untuk digunakan dalam permintaan berikutnya
        Cypress.env('accessToken', token)
      })
})