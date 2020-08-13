
// // variable calculator = first instance of calculator class
// const calculator = document.querySelector('.calculator')

// //keys = first instance of calculator keys class
// const keys = calculator.querySelector('.calculator__keys')

// //on click of any children of calculator keys class(keys) - if buttons, event is triggered
// keys.addEventListener('click', e => {
//     if (e.target.matches('button')) {

// // action variable = those buttons targeted with data-action attribute 
// const key = e.target
// const action = key.dataset.action  

// //if not true, they will be number keys

//     if (!action) {
//         console.log('number key!')
//     } 
// // if key has data-action that is equal to add or subtract or multiply or divide then the key is an operator
// if (
//     action === 'add' ||
//     action === 'subtract' ||
//     action === 'multiply' ||
//     action === 'divide'
// ) {
//     console.log('operator key!')
// }

// if (action === 'decimal') {
//         console.log('decimal-key!')
// }
// if (action === 'clear') {
//     console.log('clear-key!')
// }
// if (action === 'calculate') {
//     console.log('equal-key!')
// }
// }
// })

   
// variables for first instance of classes in document
const display = document.querySelector('.calculator__display')
const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.calculator__keys') //check

//Calculate function: Perform calculation and return calculated value
const calculate = (n1, operator, n2) => {
    let result = ''
    //parse float convert string to number with decimal place
    if (operator === 'add') {
      result = parseFloat(n1) + parseFloat(n2)
    } else if (operator === 'subtract') {
      result = parseFloat(n1) - parseFloat(n2)
    } else if (operator === 'multiply') {
      result = parseFloat(n1) * parseFloat(n2)
    } else if (operator === 'divide') {
      result = parseFloat(n1) / parseFloat(n2)
    }
    
    return result
  }

  // add event on click to button class 
keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target; //event target button
        const action = key.dataset.action //data-action keys
        const keyContent = key.textContent //text content of key variable(button)
        const displayedNum = display.textContent //display text content
        // Remove .is-depressed class from all keys with forEach loop
        Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'))

        if (!action) {
            const previousKeyType = calculator.dataset.previousKeyType
            // if display is 0 or operator or calculate replace with clicked key otherwise append clicked key to displayed
            if (displayedNum === '0' ||
            previousKeyType === 'operator' ||
            previousKeyType === 'calculate') {
                display.textContent = keyContent
            } else {
                display.textContent = displayedNum + keyContent
            }
            //update previous key type when clicked
            calculator.dataset.previousKeyType = 'number'
        }
        // If previous key displaynum does not include decimal upon action, append. Otherwise 0.
        if (action === 'decimal') {
            if (!displayedNum.includes('.')) {
              display.textContent = displayedNum + '.'
            } else if (previousKeyType === 'operator') {
              display.textContent = '0.'
            }
            
          calculator.dataset.previousKeyType = 'decimal'
          }

        if (
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
        ) {
            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayedNum
            const previousKeyType = calculator.dataset.previousKeyType
            
            //Prevent calculator from performing a calculation on subsequent clicks on the operator key
            if (
                firstValue &&
                operator &&
                previousKeyType !== 'operator' &&
                previousKeyType !== 'calculate') {
                const calcValue = calculate(firstValue, operator, secondValue)
                display.textContent = calcValue;
                // Update calculated value as firstValue to continue calculation
                calculator.dataset.firstValue = calcValue
            } else {
            // If there are no calculations, save displayedNum as the firstValue
                calculator.dataset.firstValue = displayedNum
            }
            //highlight operator key when pressed
            key.classList.add('is-depressed')
            
            // Add custom attribute to tell if previous key clicked is operator
            calculator.dataset.previousKeyType = 'operator'
            calculator.dataset.firstValue = displayedNum
            calculator.dataset.operator = action
        }

        //Reset to initial state, clear all custom attributes        
        if (action === 'clear') {
            if (key.textContent === 'AC') {
                calculator.dataset.firstValue = ''
                calculator.dataset.modValue = ''
                calculator.dataset.operator = ''
                calculator.dataset.previousKeyType = ''
              } else {
                key.textContent = 'AC'
              }
            display.textContent = 0;
            calculator.dataset.previousKeyType = 'clear'
        }
        //If not clear, change its textContent
        if (action !== 'clear') {
            const clearButton = calculator.querySelector('[data-action=clear]')
            clearButton.textContent = 'CE'
        }
        //calculation of 3 values
        if (action === 'calculate') {
            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayedNum
            const previousKeyType = calculator.dataset.previousKeyType
           
            if (firstValue) {
                if (previousKeyType === 'calculate') {
                    firstValue = displayedNum;
                  //Store second value in modifier value   
                  secondValue = calculator.dataset.modValue;
                  }
                display.textContent = calculate(firstValue, operator, secondValue)
            }
            // Set modValue attribute
            calculator.dataset.modValue = secondValue;
            //If the previousKeyType is calculate, we know we can use calculator.dataset.modValue as secondValue
            calculator.dataset.previousKeyType = 'calculate';
        }
    }
})
