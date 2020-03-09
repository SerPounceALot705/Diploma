import GitHubApi from '../../modules/GitHubApi';
import CommitsCardList from './CommitsCardList';
import GlideInit from '../../utils/GlideInit';
import CommitsCard from './CommitsCard';
import Utils from '../../utils/Utils';

export default class CommitsCarousel {
    constructor() {
        this.commits = [];
        const gitHubApi = new GitHubApi();
        
        gitHubApi.getCommits()
            .then(result => {
                this.commits = result;
                this._applyCommitsCard();
                const glideInit = new GlideInit();

            })
            .catch(error => {
                console.log(error);
            })
    }

    _applyCommitsCard() {
        const commitsCardList = new CommitsCardList(document.querySelector('.glide__slides'), new CommitsCard(new Utils()));
        commitsCardList.render(this.commits);
    }
}
