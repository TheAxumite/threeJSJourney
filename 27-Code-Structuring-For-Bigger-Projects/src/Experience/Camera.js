import * as THREE from 'three'
import Experience from "./Experience"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class Camera
{
    constructor()
    {
         this.experience = new Experience()
         this.sizes = this.experience.sizes
         this.scene = this.experience.scene
         this.canvas = this.experience.canvas
        
         this.setInstance()
         this.setOrbitsCOntrols()

       console.log(this)
       
    }

    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(45, this.sizes.Width / this.sizes.Height, 0.1, 100)
        this.instance.position.set(6, 4, 8)
        this.scene.add(this.instance)
    }

    setOrbitsCOntrols()
    {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
    }

    resize()
    {
        this.instance.aspect = this.sizes.Width / this.sizes.Height
        this.instance.updateProjectionMatrix()
        
    }
}