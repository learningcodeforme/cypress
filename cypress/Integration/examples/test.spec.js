/// <reference types= "cypress" />  

describe("Test Suite", function () {
    it("Test case", function () {
        // any command start in cypress with cy 
        //visit() -to launch 
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/')
        //get() to grabe the locator
        //type() to type text
        cy.get('form input').type('ca')
        //wait() to make the test to wait
        cy.wait(2000)
        // parent child chain  
        // .should() assertion 
        //'have.lenght -- to validate lenght give as second arrgument
        cy.get('.products .product').should('have.length', 4)
        //.find() -- > to chain the locator with parent laocator and reduce 
        //scope of search within the parent locator 
        //eq() ->  to get index of array
        //contains()- to search for texr
        cy.get('.products').as('productLocator')
        cy.get('.products').find('.product').eq(1).contains('ADD TO CART')
            .click()
        cy.wait(2000)
        //each() -Iterate through an array like structure (arrays or objects with a length property).
        // #el is used to iterate to list
        cy.get('.products .product').each(($el, index, $list) => {
            // .text() -to grab the text 
            const textVeg = $el.find('h4.product-name').text()
            //cy.log() - to print anything on console
            cy.log(textVeg)
            //include() it js method to validate string
            if (textVeg.includes('Cashews')) {

                //cy.wrap to sync the js other wise it not wait for promise ()
                cy.wrap($el).find('button').click()
            }
        })
        //text() -it is jquery command 
        // cypress can allow jquery but it cannot handle promise ( we need to manually solve it)

        //assersation -- should with have-text
        cy.get('.brand').should('have.text', 'GREENKART')

        const logo = cy.get('.brand').then((logo) => {
            cy.log(logo.text())

            // alias - as()  we dfine as locator aslia and call the using 
            //@alias- name ( check in line number 49)
            cy.get('.products').as('productLocator')
            cy.get('@productLocator').find('.product').eq(0).contains('ADD TO CART')
                .click()

            // console.log is not cypess command so it async and it can execute any time .it appear in console of browser ( press F12 and check in console tab of browser)
            console.log('Printing in console')
        })
        //  cy.log(logo.text())

    })
    it('Checkout the cart', () => {
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/')
        cy.get('form input').type('ca')
        cy.wait(2000)
        cy.get('.products .product').each(($el, index, $list) => {
            const textVeg = $el.find('h4.product-name').text()
            cy.log(textVeg)
            if (textVeg.includes('Cashews')) {
                cy.wrap($el).find('button').click()
            }
        })

        cy.get('.cart-icon').click()
        cy.contains('PROCEED TO CHECKOUT').click()
        cy.contains('Place Order').click()
    })
})