//todo add page object model and move selectors and reused methods in the class object
describe('Test Factorial Page', () => {
    beforeEach(() => {
        cy.visit('http://qainterview.pythonanywhere.com/');
        cy.get('h1').should('be.visible');
        cy.get('h1').should('contain.text', 'The greatest factorial calculator!');
        cy.get('[id="number"]').should('be.visible');
        cy.get('[id="getFactorial"]').should('be.visible');
    })

    it('Should calculate factorial for lower boundary inclusive values', () => {
        for (let integer = 10; integer < 12; integer++) {
            cy.get('[id="number"]')
                .clear()
                .type(integer.toString());
            cy.get('[id="getFactorial"]').click();
            cy.get('[id="resultDiv"]').should('be.visible');
            //todo: create a method for factorial number that returns the expected result
        }
    })

    it('Should calculate factorial for upper boundary inclusive values', () => {
        for (let integer = 99; integer < 101; integer++) {
            cy.get('[id="number"]')
                .clear()
                .type('100');
            cy.get('[id="getFactorial"]').click();
            cy.get('[id="resultDiv"]').should('be.visible');
            //todo: create a method for factorial number that returns the expected result
        }
    })

    //todo: FE + BE defect
    it('Should not calculate factorial for lower boundary exclusive values', () => {
        for (let integer = 8; integer < 10; integer++) {
            cy.get('[id="number"]')
                .clear()
                .type(integer.toString());
            cy.get('[id="getFactorial"]').click();
            cy.get('[id="resultDiv"]').should('not.be.visible');
        }
    })

    //todo: FE + BE defect
    it('Should not calculate factorial for upper boundary exclusive values', () => {
        for (let integer = 101; integer < 103; integer++) {
            cy.get('[id="number"]')
                .clear()
                .type(integer.toString());
            cy.get('[id="getFactorial"]').click();
            cy.get('[id="resultDiv"]').should('not.be.visible');
        }
    })

    it('Should prevent factorial calculation when nothing is typed', () => {
        cy.get('[id="getFactorial"]').click();
        cy.get('[id="resultDiv"]').should('be.visible');
        cy.get('[id="resultDiv"]').should('contain.text', 'Please enter an integer')
        cy.get('[id="number"]')
            .should('have.css', 'border')
            .and('include', 'solid rgb(255, 0, 0)');
    })

    it('Should prevent factorial calculation when space is typed', () => {
        cy.get('[id="number"]')
            .clear()
            .type(' ');
        cy.get('[id="getFactorial"]').click();
        cy.get('[id="resultDiv"]').should('be.visible');
        cy.get('[id="resultDiv"]').should('contain.text', 'Please enter an integer')
        cy.get('[id="number"]')
            .should('have.css', 'border')
            .and('include', 'solid rgb(255, 0, 0)');
    })

    //todo BE defect
    it('Should prevent factorial calculation for decimal value', () => {
        cy.get('[id="number"]')
            .clear()
            .type('20.0');
        cy.get('[id="getFactorial"]').click();
        cy.get('[id="resultDiv"]').should('contain.text', 'Please enter an integer')
        cy.get('[id="number"]')
            .should('have.css', 'border')
            .and('include', 'solid rgb(255, 0, 0)');

    })

    it('Should prevent factorial calculation for special characters', () => {
        cy.get('[id="number"]')
            .clear()
            .type('!@#$^]');
        cy.get('[id="getFactorial"]').click();
        cy.get('[id="resultDiv"]').should('not.be.visible');
    })

    //TODO check verification
    it('Should prevent factorial calculation for number including e', () => {
        cy.get('[id="number"]')
            .clear()
            .type('12e');
        cy.get('[id="getFactorial"]').click();
        cy.get('[id="resultDiv"]').should('not.be.visible');
    })
})