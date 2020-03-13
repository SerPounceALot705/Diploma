import Glide from '@glidejs/glide'

export default class GlideInit {
    constructor() { }

    static Init() {
        new Glide('.glide', {
            type: 'carousel',
            focusAt: 'center',
            perView: 4,
            breakpoints: {
                1280: {
                    perView: 3
                },
                1024: {
                    perView: 2
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
    }
}