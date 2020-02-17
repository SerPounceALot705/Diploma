import NewsCard from './NewsCard';

export default class NewsCardList {
    constructor(container) {
        this.container = container; 
    }

    render(data) {  
        data.forEach(newsCard => {
            this._appendCard(newsCard);
        })    
    }

    _appendCard(data) {
        const newsCard = new NewsCard();   

        const card = newsCard.create(data); 
        this.container.appendChild(card);
    };
}