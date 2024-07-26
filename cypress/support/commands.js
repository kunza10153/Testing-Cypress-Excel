// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
/// <reference types="Cypress" />
/// <reference types="cypress-xpath" />
Cypress.Commands.add("parseXlsx", (inputFile) => {
    return cy.task('parseXlsx', { filePath: inputFile })
});


Cypress.Commands.add('login_user', (username, password) => {
    cy.visit("http://10.35.29.184/")
    cy.get('#username').type(username)
    cy.get('#password').type(password)
    cy.get("[type='submit']").click()
    if(username=="thidakan.cha"){
        cy.xpath('/html/body/div[2]/div/div/div/div[2]/div[2]/div[2]/div/div/div/div[3]/div').click();
        cy.xpath('/html/body/div[2]/div/div/div/div[2]/div[3]/div[3]/button').click()
    } 
    else{
        cy.xpath('/html/body/div[2]/div/div/div/div[2]/div[2]/div[2]/div/div/div/div[2]/div').click();
        cy.xpath('/html/body/div[2]/div/div/div/div[2]/div[3]/div[3]/button').click()
    }
    
})


Cypress.Commands.add('logout', () => {
    cy.xpath('//*[@id="app"]/div/div/header/div/div[5]/div/div').click();
    cy.get('.v-select__selection-text').then($element => {
        const text = $element.text().trim(); 
    
        if (text === 'ผู้รับการพัฒนา') {
            cy.get('body > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > div:nth-child(4) > div:nth-child(1)').click();
        } else {
            cy.get('body > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > div:nth-child(4) > div:nth-child(1)').click();
        }
    });
    
    
});