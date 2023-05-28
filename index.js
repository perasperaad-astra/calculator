
//Selectors and event listeners 
let display = document.querySelector("#display"); 
let runningTotal = document.querySelector("#runningTotal"); 
let errorText = document.querySelector("#errorText"); 

let deleteLastButton = document.querySelector('#deleteLast'); 
deleteLastButton.addEventListener('click', () => {
    example.deleteCurrentNum(); 
    runningTotal.textContent = example.getNums(); 
}) 

let numButtons = document.querySelectorAll(".num"); 
numButtons.forEach(numButton => {
    numButton.addEventListener("click", (e) => {
        example.populateNums(e.target.value); 
        runningTotal.textContent = `${example.getNums()} ${example.getCurrentNum()}`; 
    })
})

document.addEventListener('keydown', (event) => {
    var name = event.key;
    var code = event.code;

    if (name == "1" || name == "2" || name == "3" || name == "4" || name == "5" || name == 
    "6" || name == "7" || name == "8" || name == "9" || name == ".") {
       example.populateNums(name); 
        runningTotal.textContent = `${example.getNums()} ${example.getCurrentNum()}`; 
        
     } else if (name == "*" || name == "/" || name == "+" || name == "-" || name == "Enter" || name == 
     "Backspace" ) {
        if (name == "Enter") {
            event.preventDefault(); 
            example.populateNums("="); 
            display.textContent = example.operate(); 
            return; 
        } else if (name == "Backspace") {
            event.preventDefault(); 
            example.deleteCurrentNum(); 
            runningTotal.textContent = example.getNums(); 
            return; 
         }
        event.preventDefault(); 
        example.populateNums(name); 
        runningTotal.textContent = `${example.getNums()}`; 
     } 
    // alert(`Key pressed ${name} \r\n Key code value: ${code}`);
  }, false);

let clearButton = document.querySelector("#allClear"); 
clearButton.addEventListener("click", () => {
    example.clear(); 
    errorText.textContent = ""; 
    runningTotal.textContent = example.getCurrentNum();
    display.textContent = 0; 
})

let equalButton = document.querySelector("#operate"); 
equalButton.addEventListener("click", (e) => {
    example.populateNums(e.target.value); 
    display.textContent = example.operate(); 
})

const calc = function() {
    let nums = []; 
    let currentNum = []; 
    let decimalCount = 0; 
       
    return { 
        populateNums(entry){
            if (entry == "/" || entry == "*" || entry == "+" || entry == "-" || entry == "=" || entry == "%") {
                let formatted = example.getCurrentNum(); 
                nums.push(formatted); 
                nums.push(entry); 
                decimalCount = 0; 
                currentNum = []; 
    
            }  else if (entry == ".") {
                decimalCount += 1; 
                if (decimalCount > 1) {
                    errorText.textContent = "You cannot add more than one decimal per number! Try again."; 
                    decimalCount = 0; 
                    throw Error("You cannot add more than one decimal per number! Try again"); 
                } 
                currentNum.push(entry); 
            } else {
                currentNum.push(entry); 
            }
        },

        getNums(){
            return nums.join(" "); 
        },

        getCurrentNum(){
            return currentNum.join(""); 
        }, 

        deleteCurrentNum(){
            currentNum = []; 
        }, 

        editCurrentNum(val){
            currentNum.push(val); 
        },

        operate(){
            let currentTotal = 0; 

            for (let i = 1; i < nums.length; i+= 2) {
                let currentEl = nums[i]; 
                let nextEl = +(nums[i + 1]); 
                let prevEl = +(nums[i - 1]); 

                if (i == 1) {
                    if (currentEl == "*" ) {
                        currentTotal = this.multiply(prevEl, nextEl); 
                        continue; 
                    } else if (currentEl == "+") {
                        currentTotal = this.add(prevEl, nextEl); 
                        continue; 
                    } else if (currentEl == "-") {
                        currentTotal = this.subtract(prevEl, nextEl); 
                        continue; 
                    } else if (currentEl == "/") {
                        currentTotal = this.divide(prevEl, nextEl)
                        continue; 
                    } else if (currentEl == "%") {
                        currentTotal = this.modulo(prevEl, nextEl); 
                        continue; 
                    }
                } 

                if (currentEl == "*") {
                    currentTotal = this.multiply(currentTotal, nextEl); 
                } else if (currentEl == "+") {
                    currentTotal = this.add(currentTotal, nextEl)
                } else if (currentEl == "-") {
                    currentTotal = this.subtract(currentTotal, nextEl); 
                } else if (currentEl == "/") {
                    currentTotal = this.divide(currentTotal, nextEl); 
                } else if (currentEl == "%") {
                    currentTotal = this.modulo(currentTotal, nextEl); 
                }

            }

            if (Number.isInteger(currentTotal)) {
                return currentTotal; 
            } else {
                return Number(currentTotal).toFixed(15);
            }
        },

        add(num1, num2){
            return num1 + num2; 
        },  

        subtract(num1, num2){
            return num1 - num2; 
        }, 

        divide(num1, num2){
            return num1/num2; 
        }, 

        multiply(num1, num2) {
            return num1 * num2; 
        },

        modulo(num1, num2){
            return num1 % num2; 
        }, 

        clear(){
            nums = []; 
            currentNum = []; 
        }
    }
}

let example =  calc(); 


//Questions
//1. When to access this.whatever as method vs. just access variable directly? Read Kyle Simpson (I think) re 'this'
//2. Should I be using a constructor func here vs. closure? What is the difference between the two?
//3. How do I create an instance of the calc for eventlistener? Can/should I use some sort of onClick func instead? 

//Wiring up front end 
//1. Not sure how to handle the logic of forcing user input to conform to [num] [operator] [num].
    //example 1: 2 * = 
    //example 2: 2 + 3 - 2 - = 
    //example 3: + 2 = 
//2. How to clear the warning sign from the UI as soon as the user fixes the problem?
//3. Why isn't there keyboard support for "%" operator here? 