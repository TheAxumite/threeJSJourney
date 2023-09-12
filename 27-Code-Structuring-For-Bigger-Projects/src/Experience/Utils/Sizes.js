import EventEmitter from './EventEmitter.js'

export default class Sizes extends EventEmitter
{
    constructor() 
    {
        super()

        //Setup
        this.Width = window.innerWidth
        this.Height = window.innerHeight
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)

        //Resize event
        window.addEventListener('resize', () => 
        {
            this.Width = window.innerWidth
            this.Height = window.innerHeight
            this.pixelRatio = Math.min(window.devicePixelRatio, 2)

            this.trigger('resize')
           
        })
        
    }
}