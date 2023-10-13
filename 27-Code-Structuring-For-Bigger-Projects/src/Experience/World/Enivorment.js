import * as THREE from 'three'
import Experience from "../Experience";


export default class Environment {
    constructor() {

        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug

         // Debug
         if(this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('enviroment')
        }


        this.setSunLight()
        this.setEnvironmentMap()

       


    }

    setSunLight() {
        this.sunLight = new THREE.DirectionalLight('#ffffff', 1)
        this.directionalLightHelper = new THREE.DirectionalLightHelper(this.sunLight, 0.2)
        this.sunLight.castShadow = true
        this.sunLight.shadow.camera.far = 150
        this.sunLight.shadow.mapSize.set(1024, 1024)
        this.sunLight.shadow.normalBias = 1
        this.sunLight.position.set(5.5, 5, - 1.25)
        // this.sunLight.target.position.set(0,0,0)
       
        this.scene.add(this.sunLight, this.directionalLightHelper)
        

             // Debug
        if (this.debug.active) {

            this.debugFolder
                .add(this.sunLight,'intensity')
                .name('sunLightIntensity')
                .min(0)
                .max(10)
                .step(0.001)
            this.debugFolder
                .add(this.sunLight.position, 'x')
                .name('Longtiude')
                .min(-10)
                .max(10)
                .step(0.001)
                
            this.debugFolder    
                .add(this.sunLight.position, 'y')
                .name('Latiude')
                .min(-10)
                .max(10)
                .step(0.001)
            this.debugFolder
                .add(this.sunLight.position, 'z')
                .name('Z-Axis')
                .min(-10)
                .max(10)
                .step(0.001)
        }

    }
    setEnvironmentMap() {

        this.environmentMap = {}
        this.environmentMap.intensity = 0.04
        this.environmentMap.texture = this.resources.items
        this.environmentMap.texture.colorSpace = THREE.SRGBColorSpace

        this.scene.environment = this.environmentMap.texture

        this.environmentMap.updateMaterials = () => {
            this.scene.traverse((child) => {

                if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {

                    child.material.envMap = this.resources.items.environmentMapTextures

                    child.material.envMapIntensity = this.environmentMap.intensity
                    child.material.needsUpdate = true

                }


            })

        }

        this.environmentMap.updateMaterials()

        // Debug
        if (this.debug.active) {

            this.debugFolder
                .add(this.environmentMap,'intensity')
                .name('envMapIntensity')
                .min(0)
                .max(5)
                .step(0.001)
                .onChange(this.environmentMap.updateMaterials)
        }

    }


}