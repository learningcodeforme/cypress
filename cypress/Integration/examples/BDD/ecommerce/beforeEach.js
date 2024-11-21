before(function () {
    cy.fixture('E2E').then(function (data) {
        this.data = data
    
    })
})