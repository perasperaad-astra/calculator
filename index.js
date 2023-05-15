
//Selectors and event listeners 
let display = document.querySelector("#display"); 
let runningTotal = document.querySelector("#runningTotal"); 
let errorText = document.querySelector("#errorText"); 

let deleteLastButton = document.querySelector('#deleteLast'); 
deleteLastButton.addEventListener('click', () => {
    example.eraseLast(); 
    runningTotal.textContent = example.getNums(); 
}) 

let numButtons = document.querySelectorAll(".num"); 
numButtons.forEach(numButton => {
    numButton.addEventListener("click", (e) => {
        example.populateNums(e.target.value); 
        runningTotal.textContent = `${example.getNums()} ${example.getCurrentNum()}`; 
    })
})

let clearButton = document.querySelector("#allClear"); 
clearButton.addEventListener("click", () => {
    example.clear(); 
    runningTotal.textContent = example.getCurrentNum();
    display.textContent = 0; 
})

let equalButton = document.querySelector("#operate"); 
equalButton.addEventListener("click", (e) => {
    example.populateNums(e.target.value); 
    display.textContent = example.operate(); 
    console.log(example.getNums()); 
})

const calc = function() {
    let nums = []; 
    let currentNum = ""; 
    let decimalCount = 0; 
       
    return { 
        populateNums(entry){
            if (nums[nums.length - 1 ] == "/" && entry == 0) {
                errorText.textContent= "You cannot divide by 0! Try again."; 
                throw Error("You cannot divide by 0! Try again."); 
            }

            if (entry == "/" || entry == "*" || entry == "+" || entry == "-" || entry == "=" || entry == "%") {
                nums.push(currentNum); 
                nums.push(entry); 
                decimalCount = 0; 
                currentNum = ""; 
            }  else if (entry == ".") {
                decimalCount += 1; 
                if (decimalCount > 1) {
                    errorText.textContent = "You cannot add more than one decimal per number! Try again."; 
                    throw Error("You cannot add more than one decimal per number! Try again"); 
                } 
                    currentNum += entry; 
            } else {
                currentNum += entry; 
            }
        

        },

        getNums(){
            return nums.join(" "); 
        },

        getCurrentNum(){
            return currentNum; 
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
                    } else if (currentEl == "%") {
                        currentTotal = this.modulo(prevEl, nextEl); 
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
            
            return currentTotal; 
        },

        add(num1, num2){
            return num1 + num2; 
        },  

        subtract(num1, num2){
            return num1 - num2; 
        }, 

        divide(num1, num2){
            return num1 / num2; 
        }, 

        multiply(num1, num2) {
            return num1 * num2; 
        },
             
        eraseLast() {
            nums.pop(); 
        }, 

        modulo(num1, num2){
            return num1 % num2; 
        }, 

        clear(){
            currentNum = ""; 
            nums = []; 
        }
    }
}

let example =  calc(); 


//Questions
//1. When to access this.whatever as method vs. just access variable directly? Read Kyle Simpson (I think) re 'this'
//2. Should I be using a constructor func here vs. closure? What is the difference between the two?
//3. How do I create an instance of the calc for eventlistener? Can/should I use some sort of onClick func instead? 

//Wiring up front end 
//1. Use CSS grid to fix whatever is going on with the calc buttons so they fill entire div? Why aren't the buttons currently stretching to fill it?
//2. "Pressing = before entering all of the numbers or an operator could cause problems!"
//3. Round decimal answers to 'long' decimals (round to 15 places?)
//4. "Make it look nice! This is a great project to practice your CSS skills." 
    //round edges of calculator?
//5. "Add keyboard support! You might run into an issue where keys such as (/) might cause you some trouble. Read the MDN documentation for event.preventDefault to help solve this problem."
//6. Something about delete last not working properly-- it deletes it from display at first but then it's still there on the running tally
    //check if the actual num it produces is still correct (i.e. the actual operator is working correctly and it's just a bug w running tally)
