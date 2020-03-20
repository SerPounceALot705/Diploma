import Utils from './Utils';
import LocalStorage from '../modules/LocalStorageApi';

export default class DrawContainers {
    constructor() {}

    static applyLoader(container) {
        Utils.removeChild(container); 
        const template = `
            <img class="search-box__loading" src="" alt="прелоудер сайта">
            <h2 class="search-box__message">Идет поиск новостей...</h2>`;

        container.insertAdjacentHTML('beforeend', template.trim());
        container.querySelector('.search-box__loading').src = require('../../images/Ellipse.png').default;
        container.style.minHeight = '282px';
    }
        
    static applyBadResult(container ,title, message) {
        Utils.removeChild(container);
        const template = `
            <img class="search-box__result" src="" alt="результаты поиска по запросу">
            <p class="search-box__report"></p>
            <h2 class="search-box__message"></h2>`;
        
        container.insertAdjacentHTML('beforeend', template.trim());
        document.querySelector('.search-box__report').textContent = title;
        document.querySelector('.search-box__message').textContent = message;
        container.querySelector('.search-box__result').src = require('../../images/not-found_v1.png').default;
    }

    static applyHeaderCards(container) {
        Utils.removeChild(container);
        const template = `
            <div class="searching-results">
                <div class="searching-results__container-analitics">
                    <h2 class="searching-results__title">Результаты поиска</h2>
                    <a class="searching-results__analitics" href="analytics.html">Посмотреть аналитику ></a>
                </div>
                <div class="searching-results__container" id='searching-results'></div>
            </div>`;

        container.insertAdjacentHTML('beforeend', template.trim());         
    }

    static applyButton(container, newsCardList) {
        const data = LocalStorage.getData('cardsArray');
        const isPagination = LocalStorage.getData('isPagination');
        const skipCards = 3;

        if (data != null && data.articles.length > skipCards && isPagination) {
            
            const buttonTemplate = '<button class="searching-results__button">Показать еще</button>';
            container.insertAdjacentHTML('beforeend', buttonTemplate.trim());

            container.querySelector(".searching-results__button").addEventListener('click', (event) => {
                this._pagination();               
                this.applyNewsCards(newsCardList);
                
                event.target.blur();

                const pagination = LocalStorage.getData('pagination');

                if (data.articles.length <= pagination.skip + skipCards) {
                    this.removeButton(container);
                    LocalStorage.setData('isPagination', false);
                } else 
                {
                    LocalStorage.setData('isPagination', true);
                }
            });    
        }
    } 

    static applyIndex(container, newsCardList) {     
        const pagination = LocalStorage.getData('pagination');
        const data = LocalStorage.getData('cardsArray');
       
        if (data != null && data.articles.length > 0) {
            this.saveRequest();
            this.applyHeaderCards(container);
            this.applyButton(container, newsCardList);

            const cardList = data.articles.slice(0, pagination.page * pagination.take);
            newsCardList.render(cardList, document.querySelector('#searching-results'));     
        }   
    }

    static removeButton(container) {
        container.removeChild(container.querySelector(".searching-results__button"));
    }

    static applyNewsCards(newsCardList) {
        const pagination = LocalStorage.getData('pagination');
        const data = LocalStorage.getData('cardsArray');
        const skipCards = 3;

        const cardList = data.articles.slice(pagination.skip, pagination.skip + skipCards);
        const container = document.querySelector('#searching-results');
        newsCardList.render(cardList, container);     
    }

    static toggleDisabledElement(element) {
        element.disabled = !element.disabled;
    }

    static saveRequest() {
        const text = LocalStorage.getData('requestText');
        document.querySelector('.header__input').value = text;
    }

    static _pagination() {
        const pagination = LocalStorage.getData('pagination');

        pagination.page += 1;
        pagination.skip = (pagination.page - 1) * pagination.take;

        LocalStorage.setData('pagination', pagination);  
    }
}