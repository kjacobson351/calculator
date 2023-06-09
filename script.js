let firstOperand = [];
let operator = ""
let secondOperand = [];
let operationDisplayVar = "";
let result
let justOperated = false;
let timesRan = 0;
let currentOperand = "";
let thissy;
let preveiousOperator = ""
///////NUMBER BUTTONS/////////////////////
const zeroButton = document.getElementById("0btn");
zeroButton.addEventListener("click", assignOperands);

const oneButton = document.getElementById("1btn");
oneButton.addEventListener("click", assignOperands);

const twoButton = document.getElementById("2btn");
twoButton.addEventListener("click", assignOperands)

const threeButton = document.getElementById("3btn");
threeButton.addEventListener("click", assignOperands);

const fourButton = document.getElementById("4btn");
fourButton.addEventListener("click", assignOperands);

const fiveButton = document.getElementById("5btn");
fiveButton.addEventListener("click", assignOperands);

const sixButton = document.getElementById("6btn");
sixButton.addEventListener("click", assignOperands);

const sevenButton = document.getElementById("7btn");
sevenButton.addEventListener("click", assignOperands);

const eightButton = document.getElementById("8btn");
eightButton.addEventListener("click", assignOperands);

const nineButton = document.getElementById("9btn");
nineButton.addEventListener("click", assignOperands);

const decButton = document.getElementById("dec-btn");
decButton.addEventListener("click", assignOperands);
/////////////FUNCTIONAL BUTTONS////////////////////
const plusButton = document.getElementById("plus-btn");
plusButton.addEventListener("click", assignOperator);

const minusButton = document.getElementById("minus-btn");
minusButton.addEventListener("click", assignOperator);

const timesButton = document.getElementById("xbtn");
timesButton.addEventListener("click", assignOperator);

const divideButton = document.getElementById("divide-btn");
divideButton.addEventListener("click", assignOperator);

const plusMinusButton = document.getElementById("plus-minus-btn");
plusMinusButton.addEventListener("click", togglePlusMinus);

const clearButton = document.getElementById("clear-btn");
clearButton.addEventListener("click", reset);

const undoButton = document.getElementById("back-spacebtn");
undoButton.addEventListener("click", undo)

const equalsButton = document.getElementById("equals-btn");
equalsButton.addEventListener("click", operate);

const operationDisplay = document.getElementById("operation-display");

const resultDisplay = document.getElementById("result-display");

function assignOperands() {
    switch (true) {
        //allows user to start a new operation by pressing a new number after an operation.
        case (justOperated === true):
            reset();
            thissy = this.innerText;
            updateFirstOperand();
            console.log("new operation");
            break;

        //assigns first operand
        case (operator === "" && result == undefined):
            thissy = this.innerText;
            updateFirstOperand();
            console.log("first operand assigned / updated");
            break;

        //lets user enter operator first
        case (operator != "" && firstOperand.length == 0):
            firstOperand = [0];
            thissy = this.innerText;
            updateSecondOperand();
            console.log("first operand = 0, first digit of second operand assigned");
            break;

        //escapes the data saved for += functionality and assigns the second operand.
        case (operator != preveiousOperator && firstOperand.length > 0):
            thissy = this.innerText;
            secondOperand = [];
            updateSecondOperand();
            preveiousOperator = operator;
            console.log("second operand reset and assigned");
            break;


        //assigns second operand
        case (operator != "" && firstOperand.length > 0):
            thissy = this.innerText;
            updateSecondOperand();
            console.log("second operand updated");
            break;
    }
}
///////Helper functions for assignOperands()/////
function updateFirstOperand() {
    firstOperand.push(thissy);
    currentOperand = 1;
    operationDisplayVar = firstOperand.join("")
    updateOperationDisplay();
}

function updateSecondOperand() {
    secondOperand.push(thissy);
    currentOperand = 2;
    operationDisplayVar = firstOperand.join("") + operator + secondOperand.join("");
    updateOperationDisplay();
}
/////////////////////////////////////////////////
function assignOperator() {
    //stops spamming of operator while allowing a minus and subtract to be in the display at the same time.
    if (operationDisplayVar.includes(this.innerText + this.innerText)) {
        console.log("operator already in display");
    } else
        switch (true) {


            case (operator != this.innerText):
                console.log("operator assigned");
                operator = this.innerText;
                justOperated = false;
                operationDisplayVar = operationDisplayVar + operator;
                updateOperationDisplay();
                timesRan = 0;
                break;

            //allows display to update the operator to the display after the result of an operation
            case (operator == this.innerText && result != undefined):
                console.log("new operation operator assigned");
                operationDisplayVar = operationDisplayVar + operator;
                justOperated = false;
                updateOperationDisplay();
                secondOperand = [];
                timesRan = 0;
                break;
        }
}

function togglePlusMinus() {
    switch (true) {
        //changes first operand to negative if it is active and positive
        case (currentOperand === 1 && arrayToInt(firstOperand) > 0):
            firstOperand.unshift("-");
            operationDisplayVar = firstOperand.join("");
            updateOperationDisplay();
            break;
        //changes first operand to positive if its active and negative
        case (currentOperand === 1 && arrayToInt(firstOperand) < 0):
            firstOperand = arrayToInt(firstOperand);
            firstOperand = [firstOperand *= -1];
            operationDisplayVar = firstOperand.join("")
            updateOperationDisplay();
            break;
        //changes second operand to negative if it is active and positive
        case (currentOperand === 2 && arrayToInt(secondOperand) > 0):
            secondOperand.unshift("-");
            operationDisplayVar = firstOperand.join("") + operator + secondOperand.join("");
            updateOperationDisplay();
            break;
        //changes second operand to positive if its active and negative
        case (currentOperand === 2 && arrayToInt(secondOperand) < 0):
            secondOperand = arrayToInt(secondOperand);
            secondOperand = [secondOperand *= -1];
            operationDisplayVar = firstOperand.join("") + operator + secondOperand.join("");
            updateOperationDisplay();
            break;
    }
}

function undo() {
    switch (true) {
        //will stop undo from running if an operation has just been completed
        case (justOperated == true):
            console.log("can't undo");
            break;

        //will reset the first operand if it is only one digit
        case (currentOperand == 1 && firstOperand.length == 1):
            firstOperand = [];
            operationDisplayVar = firstOperand.join("");
            updateOperationDisplay();
            console.log("reset first operand");
            break;

        //will remove the last digit from the first operand if is active
        case (currentOperand == 1 && firstOperand.length > 1):
            firstOperand.pop();
            operationDisplayVar = firstOperand.join("");
            updateOperationDisplay();
            console.log("undo second operand");
            break;

        //will reset the second operand if it is only one digit
        case (currentOperand == 2 && secondOperand.length == 1):
            secondOperand = [];
            operationDisplayVar = firstOperand.join("") + operator + secondOperand.join("");
            updateOperationDisplay();
            console.log("reset second operand");
            break;

        //will remove the last ligit from second operand if it is active 
        case (currentOperand == 2 && secondOperand.length > 1):
            secondOperand.pop();
            operationDisplayVar = firstOperand.join("") + operator + secondOperand.join("");
            updateOperationDisplay();
            console.log("undo second operand")
            break;
    }
}

function updateOperationDisplay() {
    operationDisplay.innerText = operationDisplayVar;
};

function operate() {
    switch (true) {
        //stops user from making an inconplete operation ex: user only hits =
        case (operator == ""):
            console.log("no operator");
            break;

        //stops user from making an incomplete operation ex: user hits +=
        case (operator != "" && firstOperand.length == 0 && secondOperand.length == 0):
            console.log("no operands");
            break;
        ///////ADDITION/////////////////////
        //allows += functionality ex 1+=
        case (operator === "+" && secondOperand.length == 0):
            if (timesRan == 0) {
                console.log("+=");
                result = arrayToInt(firstOperand);
                result = Math.round(result * 1000) / 1000;
                timesRan++;
                operationDisplayVar = result.toString();
                updateOperationDisplay();
                justOperated = true;
                firstOperand = [result];
                currentOperand = 1;
                preveiousOperator = "+"
            } else if (timesRan > 0) {
                console.log("+=");
                result = arrayToInt(firstOperand) + (arrayToInt(firstOperand) / timesRan);
                result = Math.round(result * 1000) / 1000
                timesRan++;
                operationDisplayVar = result.toString();
                updateOperationDisplay();
                justOperated = true;
                firstOperand = [result];
                currentOperand = 1;
                preveiousOperator = "+";
            }
            break;

        //adds the operands
        case (operator === "+"):
            console.log("summed")
            result = arrayToInt(firstOperand) + arrayToInt(secondOperand);
            result = Math.round(result * 1000) / 1000;
            operationDisplayVar = result.toString();
            updateOperationDisplay();
            justOperated = true;
            firstOperand = [result];
            currentOperand = 1;
            preveiousOperator = "+"
            break;
        ///////SUBTRACTION//////////
        //allows -= functionality ex 1-=
        case (operator === "-" && secondOperand.length == 0):
            if (timesRan == 0) {
                console.log("-=")
                firstOperand.unshift("-")
                result = arrayToInt(firstOperand)
                result = Math.round(result * 1000) / 1000
                timesRan++;
                operationDisplayVar = result.toString();
                updateOperationDisplay();
                justOperated = true;
                firstOperand = [result];
                currentOperand = 1;
                preveiousOperator = "-";
            } else if (timesRan > 0) {
                console.log("-=2");
                result = arrayToInt(firstOperand) - (arrayToInt(firstOperand) / timesRan);
                result = Math.round(result * 1000) / 1000
                timesRan++;
                operationDisplayVar = result.toString();
                updateOperationDisplay();
                justOperated = true;
                firstOperand = [result];
                currentOperand = 1;
                preveiousOperator = "-";
            }
            break;
            //subtracts the operands
        case (operator === "-"):
            console.log("subtracted")
            result = arrayToInt(firstOperand) - arrayToInt(secondOperand);
            result = Math.round(result * 1000) / 1000;
            operationDisplayVar = result.toString();
            updateOperationDisplay();
            justOperated = true;
            firstOperand = [result];
            currentOperand = 1;
            preveiousOperator = "-";
            break;

        ///////////MULTIPLICATION/////////////////
        //allows x= functionality ex 1x=
        case (operator === "✕" && secondOperand.length == 0):
            if (timesRan == 0) {
                console.log("x=");
                result = arrayToInt(firstOperand) * arrayToInt(firstOperand);
                result = Math.round(result * 1000) / 1000;
                timesRan++;
                operationDisplayVar = result.toString();
                updateOperationDisplay();
                justOperated = true;
                firstOperand = [result];
                currentOperand = 1;
                preveiousOperator = "✕";
            } else if (timesRan > 0) {
                console.log("✕=2");
                result = arrayToInt(firstOperand) * thissy;
                result = Math.round(result * 1000) / 1000;
                timesRan++;
                operationDisplayVar = result.toString();
                updateOperationDisplay();
                justOperated = true;
                firstOperand = [result];
                currentOperand = 1;
                preveiousOperator = "✕";
            }
            break;

        case (operator === "✕"):
            console.log("Multiplied");
            result = arrayToInt(firstOperand) * arrayToInt(secondOperand);
            result = Math.round(result * 1000) / 1000;
            operationDisplayVar = result.toString();
            updateOperationDisplay();
            justOperated = true;
            firstOperand = [result];
            currentOperand = 1;
            preveiousOperator = "✕";
            break;
        ////////DIVISION///////////////
        //allows ÷= functionality ex 1÷=
        case (operator === "÷" && secondOperand.length == 0):
            if (timesRan == 0) {
                console.log("÷=");
                result = arrayToInt(firstOperand) / arrayToInt(firstOperand);
                result = Math.round(result * 1000) / 1000;
                timesRan++;
                operationDisplayVar = result.toString();
                updateOperationDisplay();
                justOperated = true;
                firstOperand = [result];
                currentOperand = 1;
                preveiousOperator = "÷";
            } else if (timesRan > 0) {
                console.log("÷=2");
                result = arrayToInt(firstOperand) / thissy;
                result = Math.round(result * 1000) / 1000;
                timesRan++;
                operationDisplayVar = result.toString();
                updateOperationDisplay();
                justOperated = true;
                firstOperand = [result];
                currentOperand = 1;
                preveiousOperator = "÷";
            }
            break;

        case (operator === "÷"):
            console.log("Divided");
            result = arrayToInt(firstOperand) / arrayToInt(secondOperand);
            result = Math.round(result * 1000) / 1000;
            operationDisplayVar = result.toString()
            updateOperationDisplay();
            justOperated = true;
            firstOperand = [result];
            currentOperand = 1;
            preveiousOperator = "÷";
            break;
    }
}

//turns the array into an integer allows decimals
function arrayToInt(array) {
    //let int = Array.prototype.join.call(array, "");
    let int = array.join("");
    return parseFloat(int);
}

function reset() {
    firstOperand = [];
    operator = ""
    secondOperand = [];
    operationDisplayVar = "";
    result = undefined;
    justOperated = "false"
    updateOperationDisplay();
    timesRan = 0;
    preveiousOperator = "";
    Thissy = undefined;
}

