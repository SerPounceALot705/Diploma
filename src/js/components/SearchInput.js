import NewsApi from '../modules/NewsApi';
import Utils from '../utils/Utils';
import LocalStorageApi from '../modules/LocalStorageApi';
import DrawContainers from '../utils/DrawContainers';
import { API_KEY } from '../constants/Constants';

export default class SearchInput {
    constructor() {
        this.searchBox = document.querySelector('.search-box');

        this.storage = new LocalStorageApi();
        this.draw = new DrawContainers(this.searchBox);
        this.utils = new Utils();
    
        this.getNews = (event) => {
            event.preventDefault();

            const text = event.target.elements.text.value;
            const api = new NewsApi({
                apiKey: API_KEY,
                dateFrom: this.utils.setDate(-7).toJSON(),
                dateTo: new Date().toJSON(),
                pageSize: 100,
                requestText: text
            });

            this.draw.applyLoader();
            this.draw.toggleDisabledElement(event.target.elements.text);
            this.draw.toggleDisabledElement(event.target.elements.submit);

            api.getNews()
                .then(result => {
                    this.utils.removeChild(this.searchBox);
                    this.storage.deleteData('cardsArray');
                    this.storage.deleteData('requestText');

                    if (result.articles.length == 0) {
                        this.draw.drawContainers('К сожалению по вашему запросу ничего не найдено.');
                    }
                    else {
                        this.storage.setData('cardsArray', result);
                        this.storage.setData('pagination', { page: 1, take: 3, skip: 0 });
                        this.storage.setData('requestText', text);
            
                        result.articles.length > 3 ? this.storage.setData('isPagination', true)
                                                   : this.storage.setData('isPagination', false);
                        
                        this.draw.applyHeaderCards();
                        this.draw.applyButton();
                        this.draw.applyNewsCards();
                    }
                    this.draw.toggleDisabledElement(event.target.elements.text);
                    this.draw.toggleDisabledElement(event.target.elements.submit);
                })
                .catch( () => {
                    this.draw.applyBadResult(`Во время запроса произошла ошибка. Подождите немного и попробуйте ещё раз`);
                    this.draw.toggleDisabledElement(event.target.elements.text);
                    this.draw.toggleDisabledElement(event.target.elements.submit);
                });

        }
    }
}

