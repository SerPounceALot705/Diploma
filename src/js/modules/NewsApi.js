export default class NewsApi {
    constructor (options) {
        this.apiKey = options.apiKey;
        this.dateFrom = options.dateFrom;
        this.dateTo = options.dateTo;
        this.pageSize = options.pageSize;
        this.requestText = options.requestText;
    }

    getNews() {
        return new Promise((resolve, reject) => {
            fetch(this._createRequestURL())
            .then(result => {
                if (result.ok) {
                    return result.json();             
                }
                return Promise.reject(result);
            })
            .then(result => { resolve(result) })
            .catch(error => reject(error))
        })
    }  

    _createRequestURL() {
       return `https://newsapi.org/v2/everything?q=${this.requestText}&language=ru&from=${this.dateFrom}&to=${this.dateTo}&pageSize=${this.pageSize}&apiKey=${this.apiKey}`
    }
}