describe('Search Menu', () => {
    let accessToken;

    beforeEach(() => {
        cy.accessToken().then(token => {
            accessToken = token;
        });
    });

    it('Search Menu Name = Jeruk', () => {
        cy.request({
            method: 'GET',
            url: '/menus?name=jeruk',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            failOnStatusCode: false,
        }).then((response) => {
            const menus = response.body.data;

            if (menus && menus.total > 0) {
                menus.Data.forEach((menu) => {
                    if (menu && menu.hasOwnProperty('name')) {
                        cy.log(`ID : ${menu.id} Name : ${menu.name}`);
                    }
                });
            } else {
                cy.log('Data tidak ditemukan');
            }
            // respon full API
            cy.log(JSON.stringify(response.body));
        });
    });
});
