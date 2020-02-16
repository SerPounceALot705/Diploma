export default class Utils {
    constructor () {}

    ///получение новой даты относительно текущей
    setDate(days) {
      const date = new Date();  
      return new Date (date.setDate(date.getDate() + days));
    }
    
    ///удаление всех child у элемента
    removeChild(element) {
      while (element.hasChildNodes()) {
        element.removeChild(element.firstChild);
      }
    }

    sliceString(data) {
      return data.slice(0, data.length - 3);
    }

    insertSubString(start, str, substr) {
      return str.slice(0, start) + substr + str.slice(start);
    }

}

