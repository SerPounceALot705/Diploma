import '../css/index.css';
import { About } from '../js/about';
import { Analytics } from '../js/analytics';

class Main {
    constructor(){
        console.log('index')
    }
}

(function abc() {

    new About();
    new Main();
    new Analytics();

})();

