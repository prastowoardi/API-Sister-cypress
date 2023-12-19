describe("Login Mudo", () => {
    let testData

    before(() => {
        cy.fixture('../fixtures/credentials.json').then((data) => {
            console.log(data)

            testData = data
        })
    })
    
    // Menggunakan beforeEach untuk menunggu pemanggilan data fixture selesai
    beforeEach(() => {
        cy.wrap(testData).as('testData')
    })
    
    it("Login dengan credentials benar, password salah, username salah", function () {
        const testData = this.testData

        testData.forEach((userData) => {
            cy.request({
                method: "POST",
                url: `/login`,
                body: userData,
                failOnStatusCode: userData.expectedStatus == 200
            }).then((response) => {
                if (response.status === 200) {
                    expect(response.body.data).to.have.property("token")
                    // Simpan token dalam variabel untuk digunakan selanjutnya jika diperlukan
                    const token = response.body.token
                    cy.log(token)
                } else {
                    expect(response.status).to.eq(400)
                    cy.log("Case: " + userData.description)
                }
            })
        })
    })
})
