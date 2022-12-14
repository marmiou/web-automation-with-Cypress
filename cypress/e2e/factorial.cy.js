import {
    navigate,
    getHeader,
    getNumberField,
    getFactorialBtn,
    typeOnClearedNumberField,
    calculate,
    getResult,
    calculateFactorialWithScientificNotation,
    calculateFactorialWithoutScientificNotation
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

    //Note: This has been created in order to run once and check each an every value in range(10,100) and not as a regression test
    //Also, if there was a requirement analysis, it would be a strong suggestion to have 2 different tests on unit testing level, aka
    // 1. for BE calculations within range 2.For FE translation of BE calculation to scientific notation within range (Shift left testing)
    //TEST-ID-5
    for (let integer = 10; integer <= 21; integer++) {
        it('Should calculate factorial for integer ' + integer + ' without e notation', () => {
            typeOnClearedNumberField(integer.toString());
            calculate();
            getResult().should('be.visible');
            getResult().should('have.text',
                'The factorial of ' + integer + ' is: ' + calculateFactorialWithoutScientificNotation(integer));
        })
    }

   //TEST-ID-3
    for (let integer = 22; integer <= 100; integer++) {
        let digitPrecision = 15;
        it('Should calculate factorial for integer ' + integer + ' with precision ' + digitPrecision + ' digits', () => {
            typeOnClearedNumberField(integer.toString());
            calculate();
            getResult().should('be.visible');
            getResult().should('have.text',
                'The factorial of ' + integer + ' is: ' + calculateFactorialWithScientificNotation(integer, digitPrecision));
        })
    }
})
