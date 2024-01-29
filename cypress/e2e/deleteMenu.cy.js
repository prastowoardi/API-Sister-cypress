function generateRandomId() {
    return Math.floor(Math.random() * 1000) + 1
}

var id = generateRandomId()

describe ('Delete random menu', () => {
    let accessToken

    beforeEach(() => {
        cy.accessToken().then(token => {
            accessToken = token
        })
    })
    
    it ('Delete Menu dengan ID : ' + id, () => {
        cy.request({
            method: 'DELETE',
            url: `/menu/${id}`,
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
                let message = JSON.stringify(response.body.message)
                throw new Error(`ID : ${id}, ${message}`)
            } else if (response.status === 500) {
                expect(response.status).to.eq(500)
                throw new Error('Server Error')
            }
        })
    })
})