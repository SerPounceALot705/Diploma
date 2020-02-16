import NewsCard from './NewsCard';

export default class NewsCardList {
    constructor(container) {
        this.container = container; 
    }

    render(data) {  
        data.forEach(item => {
            this._appendCard(item);
        })    
    }

    _appendCard(data) {
        const newsCard = new NewsCard();   

        const card = newsCard.create(data); 
        this.container.appendChild(card);
    };
}