module.exports = function zeros(expression) {

  let countNumbersInPrimaryFactorial = function (factorial, number) {
    let numbersCount = 0;

    while(factorial >= number) {
      factorial = Math.floor(factorial / number);
      numbersCount += factorial;
    }
    return numbersCount;
  }

  let countNumbersInSecondaryFactorial = function (factorial, number) {
    let isFactorialOdd = (factorial % 2);

    if(number % 2 == 0) { //even multiplyer
      return isFactorialOdd ? 0 : countNumbersInPrimaryFactorial(factorial, number);
    }

    let roundSecondary = isFactorialOdd ? Math.ceil : Math.floor;
    let numbersCount = 0;

    while(factorial >= number) {
      factorial = Math.floor(factorial / number);
      numbersCount += roundSecondary(factorial / 2);
    }
    return numbersCount;
  }

  let factorials = expression.split('*');

  let primaryFactorials = [];
  let secondaryFactorials = [];
  let zerosCount = 0;

  factorials.forEach(fact => {
    
    let strLength = fact.length;
    let curNumber;

    if(fact.endsWith('!!')) {
      curNumber = parseInt(fact.slice(0, strLength - 2));
      secondaryFactorials.push(curNumber);
    }
    else {
      curNumber = parseInt(fact.slice(0, strLength - 1));
      primaryFactorials.push(curNumber);
    }
  });

  let twoCount = 0;
  let fiveCount = 0;

  primaryFactorials.forEach(fact => {
    twoCount += countNumbersInPrimaryFactorial(fact, 2);
    fiveCount += countNumbersInPrimaryFactorial(fact, 5);
  });

  secondaryFactorials.forEach(fact => {
    twoCount += countNumbersInSecondaryFactorial(fact, 2);
    fiveCount += countNumbersInSecondaryFactorial(fact, 5);
  });

  return Math.min(twoCount, fiveCount);
}
