import CommitsCard from '../components/CommitsCard';

export default class CommitsCardList {
    constructor(container) {
        this.container = container;
    }

    render(data) {
        data.forEach(item => {
            this._appendCommitsCard(item);
        });
        
    }

    _appendCommitsCard(data) {
        const commitsCard = new CommitsCard()

        const commit = commitsCard.create(data);
        this.container.appendChild(commit);
    }

}