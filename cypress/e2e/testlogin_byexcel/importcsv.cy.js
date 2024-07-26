let data
let rowsLength
before(() => {
  cy.parseXlsx('cypress/fixtures/data_user.xlsx').then(jsonData => {
    data = jsonData;
    cy.log(JSON.stringify(data))
  })
})

describe('Login', () => {
    it('Login Success', () => {
      rowsLength = Cypress.$(data[0]['data']).length
      for (let i = 1; i < rowsLength; i++) {

        cy.login_user(data[0]['data'][i][0],data[0]['data'][i][1])
        cy.wait(2000);
    
        let Verifyname = '//*[@id="app"]/div/div/header/div/div[3]/div/button/span[3]';
        let expactname = ['คุณ ขุน อินโนซอฟท์', 'คุณ สนั่น สระแก้ว','คุณ ธิดากานต์ ชาติโสภณ'];
        
        cy.xpath(Verifyname).then((props) => {
          let actualname = props.text();
          let foundName = expactname.find(name => actualname === name);
          expect(foundName).to.equal(actualname);
        });
        
        cy.logout()
        
        
      }
    })

    it.only('Login fail', () => {
        rowsLength = Cypress.$(data[1]['data']).length
        for (let i = 1; i < rowsLength; i++) {
  
          cy.visit('http://10.35.29.184/')
      
          cy.get('#username').type(data[1]['data'][i][0])
          cy.get('#password').type(data[1]['data'][i][1])
          cy.get("[type='submit']").click()

          const expectUrl = 'http://10.35.29.184/login'
          cy.url().should('eq',expectUrl)
        }
      })
})