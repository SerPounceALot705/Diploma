import Utils from './Utils';
import LocalStorageApi from '../modules/LocalStorageApi';
import NewsCardList from '../components/NewsCardList';

export default class DrawContainers {
    constructor(container) {
        this.utils = new Utils();
        this.storage = new LocalStorageApi();
        this.container = container;
    }

    applyLoader() {
        this.utils.removeChild(this.container); 
        const template = `
            <img class="search-box__loading" src="" alt="прелоудер сайта">
            <h2 class="search-box__message">Идет поиск новостей...</h2>`;

        this.container.insertAdjacentHTML('beforeend', template.trim());
        this.container.querySelector('.search-box__loading').src = require('../../images/Ellipse.png').default;
        this.container.style.minHeight = '282px';
    }
        
    applyBadResult(text) {
        this.utils.removeChild(this.container);
        const template = `
            <img class="search-box__result" src="" alt="результаты поиска по запросу">
            <p class="search-box__report">Ничего не найдено</p>
            <h2 class="search-box__message"></h2>`;
        
        this.container.insertAdjacentHTML('beforeend', template.trim());
        document.querySelector('.search-box__message').textContent = text;
        this.container.querySelector('.search-box__result').src = require('../../images/not-found_v1.png').default;
    }

    applyHeaderCards() {
        this.utils.removeChild(this.container);
        const template = `
            <div class="searching-results">
                <div class="searching-results__container-analitics">
                    <h2 class="searching-results__title">Результаты поиска</h2>
                    <a class="searching-results__analitics" href="analytics.html">Посмотреть аналитику ></a>
                </div>
                <div class="searching-results__container" id='searching-results'></div>
            </div>`;

        this.container.insertAdjacentHTML('beforeend', template.trim());         
    }

    applyButton() {
        const data = this.storage.getData('cardsArray');

        if (data != null && data.articles.length > 3) {
            const buttonTemplate = '<button class="searching-results__button">Показать еще</button>';
            this.container.insertAdjacentHTML('beforeend', buttonTemplate.trim());

            this.container.querySelector(".searching-results__button").addEventListener('click', (event) => {
                this.pagination();
                this.applyNewsCards();
                event.target.blur();

                if (Math.trunc(data.articles.length / 3) == this.page - 1) {
                    this.removeButton();
                }
            });
        }
    } 

    applyIndex() {     
        const pagination = this.storage.getData('pagination');
        const data = this.storage.getData('cardsArray');
       
        if (data != null && data.articles.length > 0) {
            this.applyHeaderCards();
            this.applyButton();

            const cardNewsList = new NewsCardList(document.getElementById('searching-results'));
            cardNewsList.render(data.articles.slice(0, pagination.page * pagination.take));     
        }   
    }

    removeButton() {
        this.container.removeChild(this.container.querySelector(".searching-results__button"));
    }

    applyNewsCards() {
        const pagination = this.storage.getData('pagination');
        const data = this.storage.getData('cardsArray');

        const cardNewsList = new NewsCardList(document.getElementById('searching-results'));
        cardNewsList.render(data.articles.slice(pagination.skip, pagination.skip + 3));
    }

    pagination() {
        const pagination = this.storage.getData('pagination');

        pagination.page += 1;
        pagination.skip = (pagination.page - 1) * pagination.take;

        this.storage.setData('pagination', pagination);  
    }

    toggleDisabledElement(element) {
        element.disabled = !element.disabled;
    }
}