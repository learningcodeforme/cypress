
/// <reference types="cypress-iframe">
import 'cypress-iframe'
describe("UI controls", () => {
    it("Click checkboxes", () => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
        // check box click we can use .check()
        //to check behaviour we use  be. required( behviour
        // if have second "should" we can use "and" to keep using same 
        //check the value of checkbox is option 1 or not 
        //so we use 
        cy.get('#checkBoxOption1').check().should('be.checked').and('have.value', 'option1')
        //to unchecked and we can assert using "not.to.be"
        cy.get('#checkBoxOption1').uncheck().should('not.be.checked')
        // check boxes have common locator in that we want to click 
        // any we can pass in click option as below in check command 
        // cy.get("input[type='checkbox']").check(['option2', 'option3'])
        // to perform mutltiple click on locotor which return more then one locator so we can use .click({ multiple: true })
        cy.get("input[type='checkbox']").click({ multiple: true })
    })

    it("static Dropdown", () => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
        // static drop  have tag name select it is html rule
        // we have use select() to select static dropdown option and pass the value
        cy.get('select').select('option2').should('have.value', 'option2')

    })

    it("Dayamic dropdown Dropdown", () => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
        // here we are trying to enter few letter and based on that dropdown data will apprear
        cy.get('#autocomplete').type('ind')
        // we found common locator of items and loop using .each()
        cy.get('.ui-menu-item div').each(($el, index, $list) => {
            //item text match we perfom click operation
            if ($el.text() === 'India')
                cy.wrap($el).click()
        })
        // asserstion to check the vlaue slected in dynamic drop down is "India"
        cy.get('#autocomplete').should('have.value', 'India')

    })


    it("Element is visible or not ", () => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
        cy.get('#displayed-text').should('be.visible')
        cy.get('#hide-textbox').click()
        cy.get('#displayed-text').should('not.be.visible')
        cy.get('#show-textbox').click()
        cy.get('#displayed-text').should('be.visible')

    })


    it("Radio button ", () => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
        cy.get("input[value='radio2']").click().should('be.checked')

    })

    it("popup demo", () => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')

        cy.get('#alertbtn').click()
        cy.get('#confirmbtn').click()
        // cy.on('window:alert', (str) => {
        //     cy.log('Inside widow alert action')
        //     expect(str).to.equal('Hello, share this practice page and share your knowledge')

        // })
        // cy.on('window:confirm', (str) => {
        //     cy.log('Inside widow alert action')
        //     expect(str).to.equal('Hello, share this practice page and share your knowledge')
        // })


        // Cypress.on('uncaught:exception', (err, runnable) => {
        //     return false;
        // });

    })

    it('Handling tab widow', () => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
        // we have to remove target from new table it set as _blank id DOM 
        //  it mean it open the url in new tab
        // we use jquery invoke and removeAttr
        cy.get("#opentab").invoke('removeAttr', 'target').click();
        // still cypress need to inform we are changing the orgin so we 
        // pass cy.origin (url of new page then do the operation)
        cy.origin('https://www.qaclickacademy.com/', () => {
            cy.get("#navbarSupportedContent a[href*='about']").click();
            cy.get(".mt-50 h2").should('contain', 'QAClick Academy');

        })

    })

    it('Handling table in cyress ', () => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
        // we have table in which we found that particular text("Master Selenium Automation in simple Python Language") and from that we have to get the detail of that row and find the  price of particular text  that is present in next column

        cy.get('.table-display tr td:nth-child(2)').each(($el, index, $list) => {
            const text = $el.text()

            if (text === 'Master Selenium Automation in simple Python Language') {
                cy.log(text)
                // in  cypress we have next() to get sibliing element 
                //eq we pass index to particular text and then we apply next()
                // next() only work on get command  
                // we have to solve the promise to get text() as it is 
                cy.get('.table-display tr td:nth-child(2)').eq(index).next()
                    .then((price) => {
                        const priceText = price.text()
                        expect(priceText).to.equal('25')
                    })

            }

        })
    })


    it('Mouse over in cyress ', () => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
        //cypress dont have any method to handle mouse over 
        // we have to use jquery show method 
        // to call jquery show method we have to  use .invoke()
        cy.get('.mouse-hover-content').invoke('show')
        // click the top
        cy.contains('Top').click()
        // //verify the url should contains "top" as tex
        cy.url().should('include', 'top')

        //cypress have ability to click hindden element using 
        //  .click({force:true})

        // to handle invisible element
        cy.contains('Top').click({ force: true })
        cy.url().should('include', 'top')


    })

    it(' Getting url link from href attribute cypress ', () => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')

        cy.get('#opentab').then((el) => {
            //getting property value using prop() - it is jquery comand
            const url = el.prop('href')
            cy.log(url)
            //we have to first visit to url which we grab  
            cy.visit(url)
            // then we have to call cy.orgin() to move the control of cypress ( it avoid the crosss origin problem)
            cy.origin(url, () => {
                cy.get("div .sub-menu-bar a[href*='about']").should('contain', 'About us');
            })
        })
    })

    it(' Handling frames in  cypress ', () => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
        //step 1 - install cypress iframe plugin 
        //npm install -D  cypress-iframe
        //step 2 - Add the import in file 
        //  /// <reference types="cypress-iframe">-- to make auto suggestion available
        //import 'cypress-iframe'   --to import iframe of cypress
        //step3 - find the frame locator and ask cypress to move control or switch focus 
        // step 4 ->  cy.frameLoaded()--to load frame and pass css of frame
        cy.frameLoaded('#courses-iframe')
        //step 5 -cy.iframe  we have to give every time when we want to perform operation inside frame 
        // step 6  to find any element inside frame we use find() - > pass css inside it 
        //step 7 -- here we look for mentorship and css return 7 element and we need first one so we pass eq(0) - to get index of that
        cy.iframe().find("a[href*='mentor']").eq(0).click()
        //step 8- we look for price-title it return "0" so we put validation
        // cy.iframe().find("h1[class='pricing-title text-white ls-1']")
        //     .should('have.length', 0)
    })

    it.only(' Claneder handling in  cypress ', () => {
        const day = '15'
        const month = 'June'
        const monthNumber = "6"
        const year = '2027'
        const expectedList = [monthNumber, day, year]
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/offers')
        cy.get('.react-date-picker__inputGroup__year').click()
        cy.get('.react-calendar__navigation__label').click()
        cy.get('.react-calendar__navigation__label').click()

        // iterating trough for find year month and day
        // cy.get("button[class='react-calendar__tile react-calendar__decade-view__years__year']").each(($el, index, $list) => {
        //     if ($el.text() === year)
        //         cy.wrap($el).click()
        // })

        // cy.get("button[class='react-calendar__tile react-calendar__year-view__months__month']").each(($el, index, $list) => {
        //     if ($el.text() === month)
        //         cy.wrap($el).click()
        // })
        // cy.get("button[class='react-calendar__tile react-calendar__month-view__days__day']").each(($el, index, $list) => {
        //     if ($el.text() === day)
        //         cy.wrap($el).click()
        // })

        // contians can hold paratmeter one - type of locator and second value of locator
        cy.contains("button", year).click()
        // here Month index start at zero so we do  -1 and berfore the we convert string in to Number
        cy.get(".react-calendar__year-view__months__month").eq(Number(monthNumber) - 1).click()
        // abb is locator name and value which we pass as day =6
        cy.contains("abbr", day).click()

        //Asserstion
        // month day and year have same locator so we run each and get vlaue of attribute value and compare with expected list 
        cy.get('.react-date-picker__inputGroup__input').each(($el, index, $list) => {

            //use invoke('val') to get  value of value attribute  and then we use text()
            cy.wrap($el).invoke('val').then((text) => {
                cy.log(text)
            })
            //compare with expected list 
            cy.wrap($el).invoke('val').should('eq', expectedList[index])
        })

    })
})
