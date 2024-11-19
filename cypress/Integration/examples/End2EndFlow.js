
import HomePage from '../../support/PageObjects/HomePage'
describe("End 2 End Suite", function () {
    before(function () {

        // we need to handle the promise
        cy.fixture('E2E').then(function (data) {
            this.data = data
            this.homePage = new HomePage();
        })
    })


    it("End 2 End test case", function () {
        const productName = 'Nokia Edge';
        //  this.homePage.goTo("https://rahulshettyacademy.com/loginpagePractise/")
        //url
        this.homePage.goTo(Cypress.env('url') + "/loginpagePractise/")
        // cy.visit(Cypress.env('url') + "/loginpagePractise/")
        const projectPage = this.homePage.login(this.data.username, this.data.password)
        projectPage.pageValidation()
        projectPage.getCardLimit().should('have.length', 4)
        projectPage.selectProduct(productName)
        projectPage.selectFirstProduct()
        const cartPage = projectPage.goToCart();
        cartPage.sumOfProducts().then(function (sum) {
            expect(sum).to.be.lessThan(200000)
        })
        const confirmationPage = cartPage.checkOut();

        confirmationPage.submitFormDetails()
        confirmationPage.getAlertMessage().should('contain', 'Success')
    })

})