import Experience from "../Experience";
import * as THREE from 'three'
import Fox from "./Fox";
import Environment from "./Enivorment";
import Floor from "./Floor";


export default class World {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources




        this.resources.on('ready', () => {
            //Setup
            
            this.fox = new Fox()
            this.floor = new Floor()
           
            this.environment = new Environment()




        })







    }

    update(){
        if(this.fox)
        {
        this.fox.update()
        }
    }

}