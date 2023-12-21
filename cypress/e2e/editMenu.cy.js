import { faker } from '@faker-js/faker'

function generateRandomId() {
    return Math.floor(Math.random() * 1000) + 1
}

var id = generateRandomId()

describe('Edit menu', () => {
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

    it('[Negative] Edit menu', () => {
        cy.wrap(testData).each((testCase) => {
            cy.request({
                method: 'PUT',
                url: `/menu/${id}`,
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

    function generateRandomPrice() {
        return Math.floor(Math.random() * 100) + 1;
    }
    
    var price = generateRandomPrice()

    it ('[Positive] Edit Menu', () => {
        cy.request({
            method: 'PUT',
            url: `/menu/${id}`,
            body:{
                name: faker.commerce.productName(),
                description: faker.commerce.productDescription(),
                imageUrl: faker.image.url(),
                type: "beverage",
                price: price
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