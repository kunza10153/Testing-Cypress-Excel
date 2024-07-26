const neatCSV = require('neat-csv');


describe('Read CSV To Login', () => {
    let table;
    before(() => {
        cy.fixture('user_success.csv')
          .then(neatCSV)
          .then(data => {
              // Strip BOM from the "Username" key if present
              data = data.map(row => {
                  let cleanedRow = {};
                  for (let key in row) {
                      let cleanedKey = key.replace(/^\uFEFF/, ''); // Remove BOM
                      cleanedRow[cleanedKey] = row[key];
                  }
                  return cleanedRow;
              });
              table = data;
          }).then(() => {
              console.table(table);
              
          });
    });

    it.only('Login Success', () => {
      for (let i = 0; i < table.length; i++) {
        cy.login_user(table[i]["Username"], table[i]["Password"]);
        cy.wait(2000);
    
        let Verifyname = '//*[@id="app"]/div/div/header/div/div[3]/div/button/span[3]';
        let expactname = ['คุณ ขุน อินโนซอฟท์', 'คุณ สนั่น สระแก้ว','คุณ ธิดากานต์ ชาติโสภณ'];
        
        cy.xpath(Verifyname).then((props) => {
          let actualname = props.text();
          let foundName = expactname.find(name => actualname === name);
          expect(foundName).to.equal(actualname);
        });
        
        cy.logout();
      }
    });
    
  
})

