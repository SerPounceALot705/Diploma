import Utils from '../utils/Utils';

export default class CommitsCard {
    constructor() {}
    
    create(commit) {
        const utils =  new Utils();
        const commitCard = document.createElement('div');
        commitCard.classList.add('glide__slide');

        const template = `<div class="glide__date"></div>
        <div class="glide__container">
            <img class="glide__img" src="" alt="аватар автора коммита">
            <div class="description__container">
                <h3 class="glide__name"></h3>
                <p class="glide__e-mail"></p>
            </div>
        </div>
        <p class="glide__text"></p>`

        commitCard.insertAdjacentHTML('beforeend', template.trim());

        let commitDate = new Date(commit.commit.committer.date)
        .toLocaleDateString('ru-RU', 
            {
                year: 'numeric', 
                month: 'long', 
                day: 'numeric'
            });

        commitDate = utils.sliceString(commitDate);
        commitDate = utils.insertSubString(commitDate.length-5, commitDate, ', ');    

        commitCard.querySelector('.glide__date').textContent = commitDate;
        commitCard.querySelector('.glide__img').src = commit.author.avatar_url;
        commitCard.querySelector('.glide__name').textContent = commit.commit.committer.name;
        commitCard.querySelector('.glide__e-mail').textContent = commit.commit.committer.email;
        commitCard.querySelector('.glide__text').textContent = commit.commit.message;

        return commitCard;

    }
}

