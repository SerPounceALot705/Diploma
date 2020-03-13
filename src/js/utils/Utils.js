export default class Utils {
    constructor () {}

    ///получение новой даты относительно текущей
    static setDate(days) {
      const date = new Date();  
      return new Date (date.setDate(date.getDate() + days));
    }
    
    ///удаление всех child у элемента
    static removeChild(element) {
      while (element.hasChildNodes()) {
        element.removeChild(element.firstChild);
      }
    }

    static sliceString(data) {
      return data.slice(0, data.length - 3);
    }

    static insertSubString(start, str, substr) {
      return str.slice(0, start) + substr + str.slice(start);
    }

}

