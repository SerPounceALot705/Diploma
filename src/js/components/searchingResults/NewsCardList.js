export default class NewsCardList {
    constructor(_newsCard) {
        this.newsCard = _newsCard; 
    }

    render(newsCards, container) {
        newsCards.forEach(newsCard => {
            const card = this.newsCard.create(newsCard);
            container.appendChild(card);
        });
    }
}