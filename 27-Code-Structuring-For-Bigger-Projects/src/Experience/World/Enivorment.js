import * as THREE from 'three'
import Experience from "../Experience";


export default class Environment
{
    constructor(){
        
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
      
        this.setSunLight()
        this.setEnvironmentMap()
      
       
       
    }

    setSunLight()
    {
        this.sunLight = new THREE.DirectionalLight('#ffffff', 1)
        this.directionalLightHelper = new THREE.DirectionalLightHelper(this.sunLight, 0.2)
        this.sunLight.castShadow = true
        this.sunLight.shadow.camera.far = 150
        this.sunLight.shadow.mapSize.set(1024, 1024)
        this.sunLight.shadow.normalBias = 1
        this.sunLight.position.set(5.5, 5, - 1.25)
        // this.sunLight.target.position.set(0,0,0)
        
       
        this.scene.add(this.sunLight, this.directionalLightHelper)
    
    }
    setEnvironmentMap()
    {
       
        this.environmentMap = {}
        this.environmentMap.intensity = 0.04
        this.environmentMap.texture = this.resources.items
        this.environmentMap.texture.colorSpace = THREE.SRGBColorSpace

         this.scene.environment = this.environmentMap.texture
    
        this.setEnvironmentMap.updateMaterial = () =>
        {
            this.scene.traverse((child) =>
            {
                
                if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
                {
                    
                    child.material.envMap = this.resources.items.environmentMapTextures
                    
                    child.material.envMapIntensity = this.environmentMap.intensity
                    child.material.needsUpdate = true
                  
                }
            
                
            })
            
         }
         
       this.setEnvironmentMap.updateMaterial()
    }
}