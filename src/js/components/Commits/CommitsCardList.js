
export default class CommitsCardList {
    constructor(container, commitsCard) {
        this.commitsCard = commitsCard;
        this.container = container;
    }

    render(commitsCards) {
        commitsCards.forEach(commitCard => {
            this._appendCommitsCard(commitCard);
        });        
    }

    _appendCommitsCard(data) {
        const commit = this.commitsCard.create(data);
        this.container.appendChild(commit);
    }

}