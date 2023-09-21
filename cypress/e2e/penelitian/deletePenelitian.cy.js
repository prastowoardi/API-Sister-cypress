describe('Delete Riwayat Penelitian', () => {
    before(() => {
        cy.accessToken()
    })

    it('Delete Riwayat Penelitian', () => {
        const existingDataId = '123'; // Ganti dengan ID data yang ingin Anda hapus

        cy.request({
            method: 'DELETE',
            url: `/penelitian/${existingDataId}`,
            headers: {
                'Authorization': `Bearer ${Cypress.env('accessToken')}`,
            },
            failOnStatusCode: false
        }).then((response) => {
            if (response.status === 204) {
                expect(response.status).to.eq(204)
                cy.log(`Data dengan ID ${existingDataId} berhasil dihapus`);
            } else if (response.status === 401) {
                expect(response.status).to.eq(401)
                cy.log('Token Expired')
            } else if (response.status === 403) {
                expect(response.status).to.eq(403)
                cy.log(`Data dengan ID ${existingDataId} tidak bisa dihapus karena sedang digunakan untuk BKD / Pengajuan Angka Kredit`);
            } else if (response.status === 404) {
                expect(response.status).to.eq(404)
                cy.log(`Data dengan ID ${existingDataId} tidak ditemukan`);
            }else {
                expect(response.status).to.eq(500)
                cy.log(`ID ${existingDataId} tidak ditemukan `);
            }
        })
    })
})