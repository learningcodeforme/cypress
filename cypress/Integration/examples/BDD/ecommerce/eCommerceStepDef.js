
import { Given,When,and,Then } from "@badeball/cypress-cucumber-preprocessor"

import HomePage from "../../../../support/PageObjects/HomePage"

const homePage = new HomePage;

Given('I am on Ecommerce',()=> {
homePage.goTo(Cypress.env('url') + "/loginpagePractise/")
})

When('I login to the application',function() {
    this.projectPage = homePage.login(this.data.username, this.data.password)
    this.projectPage.pageValidation()
    this.projectPage.getCardLimit().should('have.length', 4)
    
    })

   When('I add the items in the cart and checkout', function()
   { 
    this.projectPage.selectProduct(this.data.productName)
    this.projectPage.selectFirstProduct()
    this.cartPage = this.projectPage.goToCart();

 })

 Then('validate the total price',function() {
    this.cartPage.sumOfProducts().then(function (sum) {
        expect(sum).to.be.lessThan(200000)
    })
})

 Then('select the country submit and verify it',function(){
     const confirmationPage = this.cartPage.checkOut();
     confirmationPage.submitFormDetails()
     confirmationPage.getAlertMessage().should('contain', 'Success')

 })
   

