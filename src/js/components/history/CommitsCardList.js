import CommitsCard from './CommitsCard';

export default class CommitsCardList {
    constructor() { }

    static render(container, commitsCards) {
        commitsCards.forEach(commitCard => {
            const commit = CommitsCard.create(commitCard);
            container.appendChild(commit);
        });
    }
}