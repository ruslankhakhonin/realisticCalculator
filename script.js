"use strict";
  
    // Shortcut to get elements
    let el = function(element) {
      if (element.charAt(0) === "#") { // If passed an ID...
        return document.querySelector(element); // ... returns single element
      }
  
      return document.querySelectorAll(element); // Otherwise, returns a nodelist
    };

let currentNumber = "", // Current number
    oldNumber = "", // First number
    memNumber = "",
    resultNumber, // Result
    operator, // Batman
    display = el("#display"), // Calculator screen where result is displayed
    equals = el("#equals"),
    memory = el("memRC"),
    numbers = el(".cipher"), // List of numbers
    operators = el(".operator");// List of operators

// When: Number is clicked. Get the current number selected
let setNum = function() {
    if (resultNumber) { // If a result was displayed, reset number
      currentNumber = this.getAttribute("data-number");
      resultNumber = "";
    } else{ // Otherwise, add digit to previous number (this is a string!)
        currentNumber += this.getAttribute("data-number");
    }

    display.innerHTML = currentNumber; // Display current number

  };

  // When: Operator is clicked. Pass number to oldNum and save operator
let moveNum = function() {
    oldNumber = currentNumber;
    currentNumber = "";
    operator = this.getAttribute("data-operator");

    equals.setAttribute("data-result", ""); // Reset result in attr
  };

  let memAddNum = function() {
    if (memNumber !== "") {
        memNumber = parseFloat(memNumber);
        currentNumber = parseFloat(currentNumber);
        memNumber += currentNumber;
    } else {
        memNumber = currentNumber;
    }
  }

  let memDelNum = function() {
    if (memNumber !== "") {
        memNumber = parseFloat(memNumber);
        currentNumber = parseFloat(currentNumber);
        memNumber -= currentNumber;
    } else {
        memNumber = currentNumber;
    }
  }

  let memReadClean = function() {
      if (resultNumber != memNumber) {
        resultNumber = memNumber;
        display.innerHTML = resultNumber;
      } else {
          memNumber = "";
          display.innerHTML = "0";
      }
  }

  // When: Equals is clicked. Calculate result
  let displayNum = function() {

    // Convert string input to numbers
    oldNumber = parseFloat(oldNumber);
    currentNumber = parseFloat(currentNumber);

    // Perform operation
    switch (operator) {
      case "+":
        resultNumber = oldNumber + currentNumber;
        break;

      case "-":
        resultNumber = oldNumber - currentNumber;
        break;

      case "*":
        resultNumber = oldNumber * currentNumber;
        break;

      case "/":
        resultNumber = oldNumber / currentNumber;
        break;

        // If equal is pressed without an operator, keep number and continue
      default:
        resultNumber = currentNumber;
    }

    // If NaN or Infinity returned
    if (!isFinite(resultNumber)) {
      if (isNaN(resultNumber)) { // If result is not a number; set off by, eg, double-clicking operators
        resultNumber = "You broke it!";
      } else { // If result is infinity, set off by dividing by zero
        resultNumber = "Look at what you've done";
        // el('#calculator').classList.add("broken"); // Break calculator
        // el('#reset').classList.add("show"); // And show reset button
      }
    }

    // Display result, finally!
    display.innerHTML = resultNumber;
    equals.setAttribute("data-result", resultNumber);

    // Now reset oldNum & keep result
    oldNumber = 0;
    currentNumber = resultNumber;

  };

  // When: Clear button is pressed. Clear everything
  let clearField = function() {
    oldNumber = "";
    currentNumber = "";
    display.innerHTML = "0";
    equals.setAttribute("data-result", resultNumber);
  };

  let clearAll = function() {
    oldNumber = "";
    currentNumber = "";
    memNumber = "";
    display.innerHTML = "0";
    equals.setAttribute("data-result", resultNumber);
  };

   let turnOff = function() {
    oldNumber = "";
    currentNumber = "";
    display.innerHTML = "";
    equals.setAttribute("data-result", resultNumber);
  };

  /* The click events */

  // Add click event to numbers
  for (var i = 0, l = numbers.length; i < l; i++) {
    numbers[i].onclick = setNum;
  }

  // Add click event to operators
  for (var i = 0, l = operators.length; i < l; i++) {
    operators[i].onclick = moveNum;
  }

  // Add click event to equal sign
  equals.onclick = displayNum;

  // Add click event to clear button
  el("#clear").onclick = clearField;
  el("#clearAll").onclick = clearAll;
  el("#turnOff").onclick = turnOff;

  // Memory buttons

  el("#memPlus").onclick = memAddNum;
  el("#memMinus").onclick = memDelNum;
  el("#memRC").onclick = memReadClean;

//   // Add click event to reset button
//   el("#reset").onclick = function() {
//     window.location = window.location;
//   };