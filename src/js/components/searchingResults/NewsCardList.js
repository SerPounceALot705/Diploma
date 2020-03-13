import NewsCard from './NewsCard';

export default class NewsCardList {
    constructor() { }

    static render(newsCards, container) {
        newsCards.forEach(newsCard => {
            const card = NewsCard.create(newsCard);
            container.appendChild(card);
        });
    }
}