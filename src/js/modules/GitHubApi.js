import {GITHUB_URL} from '../constants/Constants';

export default class GitHubApi {
    constructor() {}

    static getCommits(){
        return new Promise((resolve, reject) => {
            fetch(GITHUB_URL)
            .then(result => {
                if (result.ok) {
                    return result.json();
                }
                return Promise.reject(result);
            })
            .then(result => { resolve(result) })
            .catch(error => reject(error))
        })
    }
}