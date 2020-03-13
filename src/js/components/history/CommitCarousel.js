import GitHubApi from '../../modules/GitHubApi';
import CommitsCardList from './CommitsCardList';
import GlideInit from '../../utils/GlideInit';

export default class CommitsCarousel {
    constructor() {
        this.commits = [];
        
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

    _applyCommitsCard() {
        CommitsCardList.render(document.querySelector('.glide__slides'), this.commits);
    }
}
