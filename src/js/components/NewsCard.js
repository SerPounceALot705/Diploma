import Utils from '../utils/Utils';

export default class NewsCard {
    constructor () {}

    create(data) {
        const utils =  new Utils();
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

        let publicationDate = new Date(data.publicationDate)
            .toLocaleDateString('ru-RU', 
            {
                year: 'numeric', 
                month: 'long', 
                day: 'numeric'
            });
            
        publicationDate = utils.sliceString(publicationDate);
        publicationDate = utils.insertSubString(publicationDate.length-5, publicationDate, ', ');

        newsCard.querySelector('.card-image').src = (data.urlToImage == null) || (data.urlToImage == "") 
                                                    ? require('../../images/not-img.png').default 
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