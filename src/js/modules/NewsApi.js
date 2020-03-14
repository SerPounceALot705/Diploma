export default class NewsApi {
    constructor() { }

    static getNews(options) {
        return new Promise((resolve, reject) => {
            fetch(this._createRequestURL(options))
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

    static _createRequestURL(options) {
        return `https://newsapi.org/v2/everything?q=${options.requestText}&language=ru&from=${options.dateFrom}&to=${options.dateTo}&pageSize=${options.pageSize}&apiKey=${options.apiKey}`
    }
}