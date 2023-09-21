describe('Get Riwayat Penelitian', () => {
    before(() => {
        cy.accessToken()
    })
    let idValue
    it('Get All Riwayat Penelitian', () => {
        cy.request({
            method: 'GET',
            url: '/penelitian',
            headers: {
                'Authorization': `Bearer ${Cypress.env('accessToken')}`,
            },
            qs: {
                id_sdm: "28a5b89a-6eeb-4e0a-913b-1b15633b17f0",
            },
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.be.an('array')

            response.body.forEach((item) => {
                if (item.hasOwnProperty('id')) {
                    // // Tampilkan data yang memiliki properti 'id' dalam log
                    // cy.log(JSON.stringify(item))

                    idValue = response.body.map((item) => item.id) // Menyimpan semua nilai 'id' dari respons
                    cy.log(item.id)
                }
            })
        })
    })

    it('Get Detail Riwayat Penelitian', () => {
        if (idValue.length > 0) {
            const selectedId = idValue[0] // Menggunakan nilai pertama dari array
            cy.request({
                method: 'GET',
                url: `/penelitian/${selectedId}`,
                headers: {
                    'Authorization': `Bearer ${Cypress.env('accessToken')}`,
                },
            }).then((response) => {
                expect(response.status).to.eq(200)
                cy.log(JSON.stringify(response.body)) // Tampilkan seluruh data yang memiliki properti 'id'
            })
        } else {
            cy.log('ID tidak ditemukan')
        }
    })
})
