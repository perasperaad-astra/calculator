
class Calculator{
    constructor(){
    }

    operate(...nums){
        let currentTotal = 0; 

        for (let i = 1; i < nums.length; i+= 2) {
            let currentEl = nums[i]; 
            let nextEl = +nums[i + 1]; 
            let prevEl = +nums[i - 1]; 
        
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
                }
            } 

            if (currentEl == "*") {
                currentTotal = this.multiply(currentTotal, nextEl); 
            } else if (currentEl == "+") {
                currentTotal = this.add(currentTotal, nextEl)
            } else if (currentEl == "-") {
                currentTotal = this.subtract(currentTotal, nextEl); 
            }

        }
 
        return currentTotal; 

    }

    add(num1, num2){
        return num1 + num2; 
    }

    subtract(num1, num2) {
        return num1 - num2; 
    }

    multiply(num1, num2) {
        return num1 * num2; 
    }
}


let example = new Calculator(); 
console.log(example.operate("12", "+", "7")); //19
console.log(example.operate("12", "+", "7", "-", "5", "*", "3")); //42
console.log(example.operate("9", "-", "4", "*", "3", "+", "5")); //20 
console.log(example.operate("9", "-", "4", "*", "3", "+", "5", "*", "6")); //120 
console.log(example.operate("4", "*", "2", "-", "9", "*", "10")); //-10 