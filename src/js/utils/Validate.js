export default class Validity {
    constructor(input) {
        this.input = input;
    }

    isValid() {
        let invalidities = [];
        
        if (this.input.validity.valid == false) {
        
            if (this.input.value.length < 2) {
                invalidities.push('Минимальное количество символов - 2');
            }
            
            if (this.input.value.length > 30) {
                invalidities.push('setCustomValidity');
            } 

            if (this.input.value.length == 0) {
                invalidities.push('Нужно ввести ключевое слово');
            } 
        
            if (invalidities.length > 0) {
                invalidities.forEach(item => this.input.setCustomValidity(`${item}. \n`))

                return false;

            } else {
                this.input.setCustomValidity('');

                return true;
            }
        }
    }
}