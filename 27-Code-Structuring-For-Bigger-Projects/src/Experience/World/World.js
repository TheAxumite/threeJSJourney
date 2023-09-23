import Experience from "../Experience";
import * as THREE from 'three'
import Environment from "./Enivorment";

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
       

        //Test Mesh
        const testMesh = new THREE.Mesh(
            new THREE.BoxGeometry(5, 5, 5),
            new THREE.MeshStandardMaterial({ color: '#b35f45' })
        )

        //Floor
        const floor = new THREE.Mesh(
            new THREE.PlaneGeometry(10,10,10),
            new THREE.MeshStandardMaterial({ color: '#b35f45'})
        )
       floor.rotation.x = Math.PI * 0.5
       floor.rotation.y = Math.PI 
       floor.position.y = -5/2
        this.scene.add(testMesh, floor)
        
        this.resources.on('ready', () => 
        {
            //Setup
            this.environment = new Environment()
            
        })


       
      

       
       
    }

}