describe('Get Perguruan Tinggi', () => {
    before(() => {
        cy.accessToken()
    })

    it('Get Perguruan Tinggi', () => {
        cy.request({
            method: 'GET',
            url: '/referensi/perguruan_tinggi',
            headers: {
                'Authorization': `Bearer ${Cypress.env('accessToken')}`,
            },
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.be.an('array')

            cy.log("Hasil get dan 10 data ditampilkan")

            const Data = response.body.slice(0, 10);
            Data.forEach((item) => {
                cy.log(JSON.stringify(item)); // Tampilkan data dalam log
            })
        })
    })
})