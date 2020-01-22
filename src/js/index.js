import '../css/index.css';
import Glide from '@glidejs/glide'

class main {
    constructor(){
        console.log('bye world')
    }
}

(function abc() {

    new Glide('.glide', {
        type: 'carousel',
        focusAt: 'center',
        perView: 4,
        breakpoints: {
            1280: {
                perView : 3
            },
            1024 : {
                perView : 2
            },
            767: 
            {
                perView: 1
            },
            425: {
                perView: 1
            }
        }
      }).mount()
      
    const _main = new main();
})();

