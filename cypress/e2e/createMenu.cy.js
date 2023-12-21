import { faker } from '@faker-js/faker'

describe('Create menu', () => {
    let accessToken
    let testData

    before(() => {
        cy.fixture('../fixtures/menu.json').then((data) => {
            testData = data
        })
    })

    beforeEach(() => {
        cy.accessToken().then(token => {
            accessToken = token
        })
    })

    it('[Negative] Create menu', () => {
        cy.wrap(testData).each((testCase) => {
            cy.request({
                method: 'POST',
                url: '/menu',
                body: testCase,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                if (response.status === 200) {
                    expect(response.status).to.eq(200)
                    cy.log(JSON.stringify(response.body))
                } else if (response.status === 400 || response.status === 401) {
                    expect(response.status).to.eq(400) || expect(response.status).to.eq(401)
                    cy.log(JSON.stringify(response.body.message))
                } else if (response.status === 500) {
                    expect(response.status).to.eq(500)
                    cy.log('Server Error')
                }
            })
        })
    })

    it ('[Positive] Create Menu', () => {
        cy.request({
            method: 'POST',
            url: '/menu',
            body:{
                name: faker.commerce.productName(),
                description: faker.commerce.productDescription(),
                imageUrl: faker.image.url(),
                type: "beverage",
                price: 15
            },
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            failOnStatusCode: false
        }).then((response) => {
            if (response.status === 200) {
                expect(response.status).to.eq(200)
                cy.log(JSON.stringify(response.body))
            } else if (response.status === 400 || response.status === 401) {
                expect(response.status).to.eq(400) || expect(response.status).to.eq(401)
                cy.log(JSON.stringify(response.body.message))
            } else if (response.status === 500) {
                expect(response.status).to.eq(500)
                cy.log('Server Error')
            }
        })
    })
})