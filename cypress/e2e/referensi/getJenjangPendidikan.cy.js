describe('Get Jenjang Pendidikan', () => {
    before(() => {
        cy.accessToken()
    })

    it('Get Jenjang Pendidikan', () => {
        cy.request({
            method: 'GET',
            url: '/referensi/jenjang_pendidikan',
            headers: {
                'Authorization': `Bearer ${Cypress.env('accessToken')}`,
            },
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.be.an('array')

            // Loop melalui setiap objek dalam array
            response.body.forEach((item) => {
                if (item.hasOwnProperty('id')) {
                    // Tampilkan data yang memiliki properti 'id' dalam log
                    cy.log(JSON.stringify(item)) // Menggunakan JSON.stringify() untuk tampilan yang lebih baik
                } else {
                    cy.log("Tidak ada id pada respon body")
                }
            })
        })
    })
})