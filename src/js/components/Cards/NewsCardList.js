
export default class NewsCardList {
    constructor(_container, _newsCard) {
        this.container = _container;
        this.newsCard = _newsCard; 
    }

    render(newsCards) {  
        newsCards.forEach(newsCard => {
            this._appendCard(newsCard);
        })    
    }

    _appendCard(data) {
        const card = this.newsCard.create(data); 
        this.container.appendChild(card);
    };
}