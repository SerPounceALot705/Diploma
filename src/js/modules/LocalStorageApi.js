export default class LocalStorageApi {
    constructor() {}

    setData(key, data) {
        localStorage.setItem(key, JSON.stringify(data)); 
    }

    getData(key) {
        return JSON.parse(localStorage.getItem(key));
    }

    deleteData(key) {
        localStorage.removeItem(key);
    }

}