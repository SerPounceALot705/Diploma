import GitHubApi from '../../modules/GitHubApi';
import CommitsCardList from './CommitsCardList';
import GlideInit from '../../utils/GlideInit';
import CommitsCard from './CommitsCard';

export default class CommitsCarousel {
    constructor() {
        this.commits = [];
    }

    _applyCommitsCard() {
        const commitsCardList = new CommitsCardList(CommitsCard);
        commitsCardList.render(document.querySelector('.glide__slides'), this.commits);
    }

    getCommits() {
        GitHubApi.getCommits()
            .then(result => {
                this.commits = result;
                this._applyCommitsCard();
                GlideInit.Init();
            })
            .catch(error => {
                console.log(error);
            })
    }
}
