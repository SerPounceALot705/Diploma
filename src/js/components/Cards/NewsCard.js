export default class NewsCard {
    constructor (_utils) {
        this.utils = _utils;
    }

    create(data) {
        const newsCard = document.createElement("div");
        newsCard.classList.add("card");
        
        const template = `
            <img class=card-image src="" alt="фото новости">
            <div class="card-info">
                <div class="data"></div>
                <h2 class="card-title"></h2>
                <p class="card-text">}</p>
                <a href="" class="card-link" target="_blank"></a>
            </div>`;

        newsCard.insertAdjacentHTML('beforeend', template.trim());

        let publicationDate = new Date(data.publishedAt)
            .toLocaleDateString('ru-RU', 
            {
                year: 'numeric', 
                month: 'long', 
                day: 'numeric'
            });
            
        publicationDate = this.utils.sliceString(publicationDate);
        publicationDate = this.utils.insertSubString(publicationDate.length-5, publicationDate, ', ');

        newsCard.querySelector('.card-image').src = (data.urlToImage == null) || (data.urlToImage == "") 
                                                    ? require('../../../images/not-img.png').default 
                                                    : data.urlToImage;

        newsCard.querySelector('.card-title').textContent = (window.innerWidth > 768) 
                                                            ? (data.title) 
                                                            : (data.title);

        newsCard.querySelector('.card-text').textContent = (data.description);
        newsCard.querySelector('.card-link').textContent = data.source.name;
        newsCard.querySelector('.card-link').href = data.url;
        newsCard.querySelector('.data').textContent = publicationDate;

        return newsCard;
    }
}