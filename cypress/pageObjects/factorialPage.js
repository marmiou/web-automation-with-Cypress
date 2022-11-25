import factorial from "bigint-factorial";

export function navigate() {
    return cy.visit('http://qainterview.pythonanywhere.com/');
}

export function getHeader() {
    return cy.get('h1')
}

export function getNumberField() {
    return cy.get('[id="number"]')
}

export function getFactorialBtn() {
    return cy.get('[id="getFactorial"]')
}

export function getResult() {
    return cy.get('[id="resultDiv"]')
}

export function typeOnClearedNumberField(int) {
    return getNumberField()
        .clear()
        .type(int.toString());
}

export function clickFactorialBtn() {
    return getFactorialBtn().click()
}

export function calculateFactorialWithScientificNotation(int) {
    const format = {
        notation: 'scientific',
        maximumFractionDigits: 15
    };

    return factorial(BigInt(int))
        .toLocaleString('en-US', format)
        .toLowerCase()
        .replace('e', "e+")
}

//todo
//my factorial method
// let i, result = BigInt(1);
// for (i=BigInt(2); i <=(integer+1); i++){
//     result *=i;
// }
//let scientificFormatResult = result.toLocaleString('en-US', format)