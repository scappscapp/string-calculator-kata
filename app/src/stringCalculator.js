import { NegativeNumbersNotAllowed } from "./negativeNumberError.js";

class StringCalculator{
    
    add(numbers) {
        let result = 0;
        let delimiter = ',';
        let startingRegex = /(?<=\/\/).*?(?=\n)/;

        if(numbers.trim()){

            let numArray = [];
            let checkInitialDelimiter = startingRegex.test(numbers);

            if(checkInitialDelimiter) {
                delimiter = numbers.match(startingRegex);
                numArray = numbers.split(new RegExp('[\n' + delimiter + ']+')).slice(1);
            }else{
                numArray = numbers.split(new RegExp('[\n' + delimiter + ']+'));
            }

            if (numArray.some( elem => parseInt(elem) < 0)){
                throw new NegativeNumbersNotAllowed("negatives not allowed: " + numArray.filter(elem => parseInt(elem) < 0));
            }

            result = numArray.filter( elem => parseInt(elem) <= 1000).reduce((elem1, elem2) => parseInt(elem1) + parseInt(elem2));
        }
        return result;
    }
}

export {StringCalculator};