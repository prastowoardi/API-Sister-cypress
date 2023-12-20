import { faker } from '@faker-js/faker'

describe('Register Mudo', () => {
    let testData

    before(() => {
        cy.fixture('../fixtures/register.json').then((data) => {
            console.log(data)
            testData = data
        })
    })

    it('Gagal Register', function () {
        testData.forEach((userRegister) => {
            cy.request({
                method: 'POST',
                url: '/register',
                body: userRegister,
                failOnStatusCode: false,
            }).then((response) => {
                if (response.status === 200) {
                    expect(response.status).to.eq(200)
                    cy.log(JSON.stringify(response.body))
                } else if (response.status === 400) {
                    expect(response.status).to.eq(400)
                    cy.log('Failed Registration:', userRegister.description)
                } else if (response.status === 500) {
                    expect(response.status).to.eq(500)
                    cy.log('Server Error')
                }
            })
        })
    })

    it('Berhasil Register', () => {
        cy.request({
            method: 'POST',
            url: '/register',
            body: {
                name: faker.name.fullName(),
                username: faker.internet.userName(),
                password: faker.internet.password(),
                roleId: 1,
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            cy.log(response.body.message)
        })
    })
})
