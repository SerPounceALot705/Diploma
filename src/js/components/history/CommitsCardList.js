export default class CommitsCardList {
    constructor(_commitCard) {
        this.commitCard = _commitCard;
    }

    render(container, commitsCards) {
        commitsCards.forEach(commitCard => {
            const commit = this.commitCard.create(commitCard);
            container.appendChild(commit);
        });
    }
}