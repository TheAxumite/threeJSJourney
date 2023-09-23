import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import EventEmitter from "./EventEmitter";
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

export default class Resources extends EventEmitter
{
    constructor(sources)
    {
        super()

        //Options
        this.sources = sources
      
        //Setup
        this.items = {}
        this.toLoad = this.sources.length
        this.loaded = 0
        
        this.setLoaders()
        this.startLoading()
        
        
       
        

    }
    setLoaders(Draco = false)
    {
        this.loaders = {}
        // this.loaders.dracoLoader = new DRACOLoader()
        // this.loaders.dracoLoader.setDecoderPath('/draco/')
        this.loaders.gltfLoader = new GLTFLoader()
        // this.loaders.dracoLoad = Draco ? null: this.loaders.gltfLoader.setDRACOLoader(this.dracoLoader)
        this.loaders.textureLoader = new THREE.TextureLoader()
        this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader()


    }
    
    startLoading()
    {
        //Load each source
        for(const source of this.sources)
        {
            if(source.type === 'cubeTexture')
            {
                this.loaders.cubeTextureLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                       
                    })
                
            }
            if(source.type === 'colorTexture')
            {
                this.loaders.textureLoader.load(
                    source.path,
                    (file) => 
                    {   
                        this.sourceLoaded(source, file)
                    }
                )
            }
           
        }
        
        
    }

    sourceLoaded(source, file)
    {
        
        this.items[source.name] = file
       
        this.loaded++

        if(this.loaded === this.toLoad)
        {   
            {
                console.log(this.items)
                this.trigger('ready')
            }
            
           
        }

    }

    
}