import GitHubApi from '../modules/GitHubApi';
import CommitsCardList from './CommitsCardList';
import GlideInit from '../utils/GlideInit';

export default class CommitsCarousel {
    constructor() {
        this.commits = [];
        const gitHubApi = new GitHubApi();
        
        gitHubApi.getCommits()
            .then(result => {
                this.commits = result;
                console.log(this.commits);

                this._applyCommitsCard();
                const glideInit = new GlideInit();

            })
            .catch(error => {
                console.log(error);
            })
    }

    _applyCommitsCard() {
        const commitsCardList = new CommitsCardList(document.querySelector('.glide__slides'));
        commitsCardList.render(this.commits);
    }
}
