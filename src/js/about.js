import '../css/about.css';
import Glide from '@glidejs/glide'

export class About 
{
    constructor() {
       console.log("about");
       this.glideInit();
    }

    // подключаем слайдер
    glideInit() {    
        
        try {
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
            
        } catch (error) {
            console.log(error);
        }
    }
}

