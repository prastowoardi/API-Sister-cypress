describe ('Create menu', () => {
    let accessToken
    let testData

    before(() => {
        cy.fixture('../fixtures/addMenu.json').then((data) => {
            testData = data
        })
    })
    beforeEach(() => {
        cy.wrap(testData).as('testData')
    })

    it ('Create Menu', () => {
        cy.accessToken().then(token => {
            accessToken = token

            cy.request({
                method: "POST",
                url: "/menu",
                body:{
                    "name": "Iced Coconut Water",
                    "description": "Real grated coconut, picked straight from the tree. The best choice to accompany your dinner.",
                    "type": "beverage",
                    "imageUrl": null,
                    "price": 5
                },
                headers:{
                    Authorization: `Bearer ${accessToken}`,
                    "Application-Type": "application/json"
                },
                failOnStatusCode: false
            }).then((response) => {
                if (response.status === 200) {
                    expect(response.status).to.eq(200)
                    cy.log(JSON.stringify(response.body))
                } else if (response.status === 400) {
                    expect(response.status).to.eq(400)
                    throw new Error(response.body.message)               
                } else if (response.status === 401) {
                    expect(response.status).to.eq(401)
                    throw new Error(response.body.message)
                }else if (response.status === 500) {
                    expect(response.status).to.eq(500)
                    cy.log('Server Error')
                }
            })
        })
    })
})