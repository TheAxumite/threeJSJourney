import Experience from "../Experience";
import * as THREE from 'three'
import Environment from "./Enivorment";

export default class Floor {

    constructor() {

        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        
      
        this.setGeometry()
        this.setTextures()
        this.setMaterials()
        this.setMesh()
        
        
        
    }

        setGeometry()
        {
            //Floor
            this.geometry =  new THREE.CircleGeometry(5, 64)
    
        }

        setTextures()
        {
            this.textures = {}
            this.textures.color = this.resources.items.dirtColorTexture
            this.textures.colorSpace = THREE.SRGBColorSpace
           
            this.textures.color.repeat.set(1.5, 1.5)
            this.textures.color.wrapS = THREE.RepeatWrapping
            this.textures.color.wrapT = THREE.RepeatWrapping

            this.textures.normal = {}
            this.textures.normal = this.resources.items.dirtNormalTexture
            this.textures.colorSpace = THREE.SRGBColorSpace
            this.textures.normal.repeat.set(1.5, 1.5)
            this.textures.normal.wrapS = THREE.RepeatWrapping
            this.textures.normal.wrapT = THREE.RepeatWrapping
        }

        setMaterials()
        {
            this.material = new THREE.MeshStandardMaterial({
                map: this.textures.color,
                normalMap: this.textures.normal
            })
        }

        setMesh()
        {
            this.mesh = new THREE.Mesh(this.geometry, this.material)
            this.mesh.receiveShadow = true
            this.mesh.rotation.x = Math.PI * 0.5
            this.mesh.rotation.y = Math.PI
            
            
            this.scene.add(this.mesh)
        }
        
        
       

    }
