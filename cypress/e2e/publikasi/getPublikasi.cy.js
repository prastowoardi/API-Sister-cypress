describe('Get Riwayat Publikasi', () => {
    before(() => {
        cy.accessToken()
    })
    let idValue
    it('Get All Riwayat Publikasi', () => {
        cy.request({
            method: 'GET',
            url: '/publikasi',
            headers: {
                'Authorization': `Bearer ${Cypress.env('accessToken')}`,
            },
            qs: {
                id_sdm: "28a5b89a-6eeb-4e0a-913b-1b15633b17f0",
            },
            failOnStatusCode: false
        }).then((response) => {
            if (response.status === 200) {
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
            } else {
                cy.log(response.status)
            }
        })
    })

    it('Get Detail Riwayat Publikasi', () => {
        if (idValue.length > 0) {
            const selectedId = idValue[0] // Menggunakan nilai pertama dari array
            cy.request({
                method: 'GET',
                url: `/publikasi/${selectedId}`,
                headers: {
                    'Authorization': `Bearer ${Cypress.env('accessToken')}`,
                },
                failOnStatusCode: false
            }).then((response) => {
                if (Array.isArray(response.body) && response.body.length > 0) {
                    // Respon mengandung data dalam bentuk array
                    expect(response.status).to.eq(200)
                    cy.log(JSON.stringify(response.body)) // Tampilkan seluruh data yang memiliki properti 'id'
                } else if (response.status == 401) {
                    expect(response.status).to.eq(401)
                    cy.log("Token sudah expired")
                } else if (response.status == 404 ) {
                    expect(response.status).to.eq(404)
                    cy.log("ID "+selectedId+ " tidak ditemukan")
                } else {
                    expect(response.status).to.eq(500)
                    cy.log("Gagal menyimpan ke database")
                }
            })
        } else {
            cy.log('ID tidak ditemukan')
        }
    })
})
