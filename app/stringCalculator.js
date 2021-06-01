export {StringCalculator};

class StringCalculator{
    
    add(numbers) {
        let result = 0;
        let delimiter = ',';
        
        if(numbers.trim()){

            let numArray = [];
            let delimiterString = numbers.match(/(?<=\/\/).*?(?=\n)/);

            if(delimiterString) {
                delimiter = delimiterString[0];
                numArray = numbers.split(new RegExp('[\n' + delimiter + ']+','g')).slice(1);
            }else{
                numArray = numbers.split(new RegExp('[\n' + delimiter + ']+','g'));
            }

            if (numArray.some( elem => parseInt(elem) < 0)){
                throw new Error("negatives not allowed: " + numArray.filter(elem => parseInt(elem) < 0));
            }

            result = numArray.filter( elem => parseInt(elem) <= 1000).reduce((elem1, elem2) => parseInt(elem1) + parseInt(elem2));
        }
        return result;
    }
}
