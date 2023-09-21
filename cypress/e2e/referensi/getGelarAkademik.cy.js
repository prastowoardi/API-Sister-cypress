describe ("Get Gelar Akademik", () => {
    before(() => {
        cy.accessToken()
    })

    it ("Get Gelar Akademik", () => {
        cy.request({
            method: 'GET',
            url: '/referensi/gelar_akademik',
            headers: {
                'Authorization': `Bearer ${Cypress.env('accessToken')}`,
              },
        }).then((response) => {
            expect(response.body).to.be.an('array')
            expect(response.status).to.eq(200)

            // Menggunakan variabel untuk menghitung jumlah data yang sudah ditampilkan
            let displayedCount = 0
            cy.log("Hasil get dan 10 data ditampilkan")
            // Loop melalui setiap objek dalam array
            response.body.forEach((item) => {
                if (item.hasOwnProperty('id') && displayedCount < 10) {
                    // Tampilkan data yang memiliki properti 'id' dalam log
                    cy.log(JSON.stringify(item)); // Menggunakan JSON.stringify() untuk tampilan yang lebih baik
                    displayedCount++
                }
            })
        })
    })
})