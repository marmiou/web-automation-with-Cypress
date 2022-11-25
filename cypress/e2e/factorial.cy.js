//todo: add page object model and move selectors and reused methods in the class object
//todo: create tags in order to associate testcase with defect

import {
    navigate,
    getHeader,
    getNumberField,
    getFactorialBtn,
    typeOnClearedNumberField,
    clickFactorialBtn,
    getResult,
    calculateFactorialWithScientificNotation
} from '../pageObjects/factorialPage'

describe('Test Factorial Page for numbers in range(10,100)', () => {
    beforeEach(() => {
        navigate();
        getHeader().should('be.visible');
        getHeader().should('contain.text', 'The greatest factorial calculator!');
        getNumberField().should('be.visible');
        getFactorialBtn().should('be.visible');
        getResult().should('not.be.visible');
    })

    // //todo: this has been created in order to run once and check each an every value in range(10,100) and not as a regression test
    it('skip', 'Should calculate factorial for all values in range(10,100)', () => {
        for (let integer = 10; integer <= 100; integer++) {
            typeOnClearedNumberField(integer.toString());
            clickFactorialBtn();
            getResult().should('be.visible');
            getResult().should('have.text',
                "The factorial of " + integer + " is: " + calculateFactorialWithScientificNotation(integer));
        }
    })

    //todo: FE defect lower vales do not have the scientific notation, as the upper values.
    it('Should calculate factorial for lower boundary inclusive values', () => {
        for (let integer = 10; integer <= 12; integer++) {
            typeOnClearedNumberField(integer.toString());
            clickFactorialBtn();
            getResult().should('be.visible');
            getResult().should('have.text',
                "The factorial of " + integer + " is: " + calculateFactorialWithScientificNotation(integer));
        }
    })

    it('Should calculate factorial for upper boundary inclusive values', () => {
        for (let integer = 98; integer <= 100; integer++) {
            typeOnClearedNumberField(integer.toString());
            clickFactorialBtn();
            getResult().should('be.visible');
            getResult().should('have.text',
                "The factorial of " + integer + " is: " + calculateFactorialWithScientificNotation(integer));
        }
    })

    //todo: FE + BE defect, given that we consider that the calculator should work for (10,100) range
    it('Should not calculate factorial for lower boundary exclusive values', () => {
        for (let integer = 8; integer < 10; integer++) {
            typeOnClearedNumberField(integer.toString());
            clickFactorialBtn();
            getResult().should('be.visible');
            getResult().should('contain.text', 'Please enter an integer within the range (10,100)')
            getNumberField()
                .should('have.css', 'border')
                .and('include', 'solid rgb(255, 0, 0)');
        }
    })

    //todo: FE + BE defect given that we consider that the calculator should work for (10,100) range
    it('Should not calculate factorial for upper boundary exclusive values', () => {
        for (let integer = 101; integer < 103; integer++) {
            typeOnClearedNumberField(integer.toString());
            clickFactorialBtn();
            getResult().should('be.visible');
            getResult().should('contain.text', 'Please enter an integer within the range (10,100)')
            getNumberField()
                .should('have.css', 'border')
                .and('include', 'solid rgb(255, 0, 0)');
        }
    })

    it('Should prevent factorial calculation when nothing is typed', () => {
        clickFactorialBtn();
        getResult().should('be.visible');
        getResult().should('contain.text', 'Please enter an integer')
        getNumberField()
            .should('have.css', 'border')
            .and('include', 'solid rgb(255, 0, 0)');
    })

    it('Should prevent factorial calculation when space is typed', () => {
        typeOnClearedNumberField(' ');
        clickFactorialBtn();
        getResult().should('be.visible');
        getResult().should('contain.text', 'Please enter an integer')
        getNumberField()
            .should('have.css', 'border')
            .and('include', 'solid rgb(255, 0, 0)');
    })

    //todo BE defect: 500 status code returned
    it('Should prevent factorial calculation for decimal value', () => {
        typeOnClearedNumberField('20.0')
        clickFactorialBtn()
        getResult().should('contain.text', 'Please enter an integer')
        getNumberField()
            .should('have.css', 'border')
            .and('include', 'solid rgb(255, 0, 0)');

    })

    it('Should prevent factorial calculation for special characters', () => {
        typeOnClearedNumberField('!@#$^]')
        clickFactorialBtn()
        getResult().should('contain.text', 'Please enter an integer')
        getNumberField()
            .should('have.css', 'border')
            .and('include', 'solid rgb(255, 0, 0)');
    })

    //todo defect FE+BE: 12e is an integer but with scientific notation.Maybe the error message should be more explanatory
    // also if we try with bigNumber -> nice to have an upper boundary for the form with explanatory error message
    // (status code 500 returned in BE)
    it('Should prevent factorial calculation for Exponential Integer', () => {
        typeOnClearedNumberField('12e')
        clickFactorialBtn()
        getResult().should('contain.text', 'Please enter a valid integer in range(10,100)')
        getNumberField()
            .should('have.css', 'border')
            .and('include', 'solid rgb(255, 0, 0)');
    })
})
