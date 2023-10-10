import Experience from "../Experience";
import * as THREE from 'three'

export default class Fox
{
    constructor(){
                
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.deltaTime = this.experience.time.delta
        this.debug = this.experience.debug
        
        //Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('fox')
        }
       //Setup
       this.resource = this.resources.items.foxModel
       this.setModel()
       this.setAnimation()

    }

    setModel()
    {
        this.model = this.resource.scene

        console.log(this.model)
        this.model.scale.set(0.02, 0.02, 0.020)
        this.scene.add(this.model)

        this.model.traverse((child) => 
    {
        if(child instanceof THREE.Mesh)
        {

            child.castShadow = true
            
        }
    })
    }

    setAnimation()
    {
        this.animation = {}
        this.animation.mixer = new THREE.AnimationMixer(this.model)
        
        this.animation.actions = {}

        this.animation.actions.idle  = this.animation.mixer.clipAction(this.resource.animations[0])   
        this.animation.actions.walking  = this.animation.mixer.clipAction(this.resource.animations[1])   
        this.animation.actions.running  = this.animation.mixer.clipAction(this.resource.animations[2])   

        this.animation.actions.current  = this.animation.actions.idle 
        this.animation.actions.current.play()
      
        this.animation.play = (name) =>
        {
            const newAction = this.animation.actions[name]
            const oldAction = this.animation.actions.current

            newAction.reset()
            newAction.play()
            newAction.crossFadeFrom(oldAction, 1)

            this.animation.current = newAction
        }
      
        

        }


    update()
    {
        if(this.animation.mixer != null){
            console.log(this.deltaTime)
            this.animation.mixer.update(this.deltaTime / 1000)
    
        }
    }
}