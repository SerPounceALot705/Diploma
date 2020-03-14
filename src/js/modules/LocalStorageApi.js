export default class LocalStorageApi {
    constructor() {}

    static setData(key, data) {
        localStorage.setItem(key, JSON.stringify(data)); 
    }

    static getData(key) {
        return JSON.parse(localStorage.getItem(key));
    }

    static deleteData(key) {
        localStorage.removeItem(key);
    }
}