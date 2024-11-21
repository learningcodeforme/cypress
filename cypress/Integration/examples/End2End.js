

describe("End 2 End Suite", function () {
    before(function () {

        // we need to handle the promise
        cy.fixture('E2E').then(function (data) {
            this.data = data
        })
    })


    it("End 2 End test case", function () {
        const productName = 'Nokia Edge'
        cy.visit("https://rahulshettyacademy.com/loginpagePractise/")

        // const homePage = new HomePage();
        //  homePage.login(this.data.username, this.data.password)

        cy.get('#username').type(this.data.username)
        cy.get('#password').type('learning')
        cy.get('#signInBtn').click()
        cy.wait(2000)
        // cy.visit("#signInBtn").click()
        cy.contains('Shop Name').should('be.visible')
        cy.get('app-card').should('have.length', 4)
        cy.get('app-card').filter(`:contains("${productName}")`)
            .then($element => {

                cy.wrap($element).should('have.length', 1)
                cy.wrap($element).contains('button', 'Add').click()
            })

        cy.get('app-card').eq(0).contains('button', 'Add').click()
        cy.contains('a', 'Checkout').click()
        let sum = 0
        cy.get('tr td:nth-child(4) strong')
            .each($el => {
                // each is used to iterate
                const amt = Number($el.text().split(" ")[1].trim())
                sum = sum + amt
                /// we have to solve the promise when we work on js because of js is async nature
            }).then(() => {
                expect(sum).to.be.lessThan(200000)
            })
        cy.contains('button', 'Checkout').click()
        cy.get('#country').type('India')
        Cypress.config('defaultCommandTimeOut', 10000)
        cy.get('.suggestions ul li').click()
        cy.contains('Purchase').click()
        cy.get('.alert-success').should('contain', 'Success')
    })

})