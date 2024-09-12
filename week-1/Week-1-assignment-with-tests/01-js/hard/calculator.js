/*
  Implement a class `Calculator` having below methods
    - initialise a result variable in the constructor and keep updating it after every arithmetic operation
    - add: takes a number and adds it to the result
    - subtract: takes a number and subtracts it from the result
    - multiply: takes a number and multiply it to the result
    - divide: takes a number and divide it to the result
    - clear: makes the `result` variable to 0
    - getResult: returns the value of `result` variable
    - calculate: takes a string expression which can take multi-arithmetic operations and give its result
      example input: `10 +   2 *    (   6 - (4 + 1) / 2) + 7`
      Points to Note: 
        1. the input can have multiple continuous spaces, you're supposed to avoid them and parse the expression correctly
        2. the input can have invalid non-numerical characters like `5 + abc`, you're supposed to throw error for such inputs

  Once you've implemented the logic, test your code by running
  - `npm run test-calculator`
*/

class Calculator {
  constructor() {
    this.result = 0;
  }

  add(number) {
    this.result += number;
  }

  subtract(number) {
    this.result -= number;
  }

  multiply(number) {
    this.result *= number;
  }

  divide(number) {
    this.result /= number;
  }

  clear() {
    this.result = 0;
  }

  getResult() {
    return this.result;
  }

  calculate(expression) {
    const sanitizedExpression = expression.replace(/\s+/g, ''); // Remove all spaces from the expression
    const operators = ['+', '-', '*', '/'];
    let currentNumber = '';
    let currentOperator = '+';

    for (let i = 0; i < sanitizedExpression.length; i++) {
      const char = sanitizedExpression[i];

      if (operators.includes(char)) {
        this.performOperation(currentNumber, currentOperator);
        currentNumber = '';
        currentOperator = char;
      } else {
        currentNumber += char;
      }
    }

    this.performOperation(currentNumber, currentOperator);
  }

  performOperation(number, operator) {
    const parsedNumber = parseFloat(number);

    if (isNaN(parsedNumber)) {
      throw new Error('Invalid expression');
    }

    switch (operator) {
      case '+':
        this.add(parsedNumber);
        break;
      case '-':
        this.subtract(parsedNumber);
        break;
      case '*':
        this.multiply(parsedNumber);
        break;
      case '/':
        this.divide(parsedNumber);
        break;
      default:
        throw new Error('Invalid operator');
    }
  }
}


const calculator = new Calculator();

calculator.calculate('10 +   2 *    (   6 - (4 + 1) / 2) + 7');
console.log(calculator.getResult()); // Output: 29

module.exports = Calculator;
