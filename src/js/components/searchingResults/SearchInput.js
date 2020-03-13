import Api from '../../modules/NewsApi';
import Utils from '../../utils/Utils';
import LocalStorage from '../../modules/LocalStorageApi';
import Draw from '../../utils/DrawContainers';
import { API_KEY } from '../../constants/Constants';

export default class SearchInput {
    constructor() {
        this.searchBox = document.querySelector('.search-box');
    }

    getNews(event) {
        event.preventDefault();

        const text = event.target.elements.text.value;

        const apiOptions = {
            apiKey: API_KEY,
            dateFrom: Utils.setDate(-7).toJSON(),
            dateTo: new Date().toJSON(),
            pageSize: 100,
            requestText: text
        }

        Draw.applyLoader(this.searchBox);
        Draw.toggleDisabledElement(event.target.elements.text);
        Draw.toggleDisabledElement(event.target.elements.submit);

        Api.getNews(apiOptions)
            .then(result => {
                Utils.removeChild(this.searchBox);
                LocalStorage.deleteData('cardsArray');
                LocalStorage.deleteData('requestText');

                if (result.articles.length == 0) {
                    Draw.applyBadResult(this.searchBox, 'Ничего не найдено', 'К сожалению по вашему запросу ничего не найдено.');
                }
                else {
                    LocalStorage.setData('cardsArray', result);
                    LocalStorage.setData('pagination', { page: 1, take: 3, skip: 0 });
                    LocalStorage.setData('requestText', text);

                    result.articles.length > 3 ? LocalStorage.setData('isPagination', true)
                        : LocalStorage.setData('isPagination', false);

                    Draw.applyHeaderCards(this.searchBox);
                    Draw.applyButton(this.searchBox);
                    Draw.applyNewsCards();
                }
                Draw.toggleDisabledElement(event.target.elements.text);
                Draw.toggleDisabledElement(event.target.elements.submit);
            })
            .catch((error) => {

                console.log(error);

                Draw.applyBadResult(this.searchBox, 'Ошибка', `Во время запроса произошла ошибка. Подождите немного и попробуйте ещё раз`);
                Draw.toggleDisabledElement(event.target.elements.text);
                Draw.toggleDisabledElement(event.target.elements.submit);
            });
    }
}

