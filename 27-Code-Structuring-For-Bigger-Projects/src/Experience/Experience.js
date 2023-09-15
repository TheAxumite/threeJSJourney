import * as THREE from 'three'
import Sizes from './Utils/Sizes.js'
import Time from  './Utils/Time.js'
import Camera from './Camera.js'
import Renderer from './Utils/Renderer.js'

let instance = null


export default class Experience
{
    constructor(canvas)
    {
        if(instance)
        {   
            console.log('null')
            return instance
        }
        else
        {
            instance = this
        }
        

        //Global Access
        window.experience = this

        //Options
        this.canvas = canvas
      
        //Setup
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.camera = new Camera()
        this.renderer = new Renderer()

        //Sizes resize Event
        this.sizes.on('resize', ()=>
        {   
             
            this.resize(this.sizes)
        })

        //Time tick event
        this.time.on('tick' , ()=>
        {
            this.update()
        })

    }
    resize(sizes)
    {
        
        this.camera.resize()
        
    }

    update()
    {
        
        this.camera.update()
    }

}