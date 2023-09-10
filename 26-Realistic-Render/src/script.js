import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

/**
 * Loaders
 */
const gltfLoader = new GLTFLoader()
const rgbeLoader = new RGBELoader()

//Loading Manager
const loadingManager = new THREE.LoadingManager();

loadingManager.onStart = () => 
{
    console.log('onStart')
}

loadingManager.onProgress = () => 
{
    console.log('onProgress')
}

loadingManager.onError = () => 
{
    console.log('onError')
}

loadingManager.onLoad = () => 
{
    console.log('onLoaded')
}



/**
 * Base
 */
// Debug
const gui = new dat.GUI()
const global = {}

// Canvas
const canvas = document.querySelector('canvas.webgl')


// Scene
const scene = new THREE.Scene()

/**
 * Update all materials
 */
const updateAllMaterials = () => {
    scene.traverse((child) => {
        if (child.isMesh && child.material.isMeshStandardMaterial) {
           
            child.material.envMapIntensity = global.envMapIntensity
            child.castShadow = true
            child.receiveShadow = true
        }
    })
}

/**
 * Environment map
 */
// Global intensity
global.envMapIntensity = 1
gui
    .add(global, 'envMapIntensity')
    .min(0)
    .max(10)
    .step(0.001)
    .onChange(updateAllMaterials)


// HDR (RGBE) equirectangular
rgbeLoader.load('/environmentMaps/0/2k.hdr', (environmentMap) => {
    environmentMap.mapping = THREE.EquirectangularReflectionMapping

    scene.background = environmentMap
    scene.environment = environmentMap
})

/**
 * Directional Light
 */
const directionalLight = new THREE.DirectionalLight('#ffffff', 2)
directionalLight.position.set(-4, 6.5, 2.5)
scene.add(directionalLight)
directionalLight.castShadow = true
gui.add(directionalLight, 'intensity').min(0).max(10).step(0.001).name('lightIntensity')
gui.add(directionalLight.position, 'x').min(-10).max(10).step(0.001).name('lightX')
gui.add(directionalLight.position, 'y').min(-10).max(10).step(0.001).name('lighty')
gui.add(directionalLight.position, 'z').min(-10).max(10).step(0.001).name('lightz')
gui.add(directionalLight.shadow, 'normalBias').min(-0.05).max(0.05).step(0.001)
gui.add(directionalLight.shadow, 'bias').min(-0.05).max(0.05).step(0.001)

//Shadows
directionalLight.castShadow = true
directionalLight.shadow.camera.far = 20
directionalLight.shadow.mapSize.set(4096, 4096)
directionalLight.shadow.normalBias = 0.027                                                                                                                
directionalLight.shadow.bias = -0.004                                                                                                                

//Helper
//  const directionalLightHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
// scene.add(directionalLightHelper)

//Target
directionalLight.target.position.set(0, 4, 0)
directionalLight.target.updateMatrixWorld()

/**
 * Models
 */

// // Helmet
// gltfLoader.load(
//     '/models/FlightHelmet/glTF/FlightHelmet.gltf',
//     (gltf) => {
//         gltf.scene.scale.set(10, 10, 10)
//         scene.add(gltf.scene)
//         gltf.castShadow = true
//         updateAllMaterials()
//     }
// )

// Hamburger
gltfLoader.load(
    '/models/myhamburger.glb',
    (gltf) => {
        gltf.scene.scale.set(0.4,0.4,0.4)
        gltf.scene.position.set(0, 2.5, 0)
        scene.add(gltf.scene)
        gltf.castShadow = true
        updateAllMaterials()
    }
)

//Texutres
// explanation on color texture and other types: [26-Realistic-Render/src/Notes.md]
const textureLoader = new THREE.TextureLoader(loadingManager);
const floorNormalTexture = textureLoader.load('/textures/wood_cabinet_worn_long/wood_cabinet_worn_long_nor_gl_1k.png')
const floorColorTexture = textureLoader.load('/textures/wood_cabinet_worn_long/wood_cabinet_worn_long_diff_1k.jpg')
const floorAORoughnessMetalnessTexture = textureLoader.load('/textures/wood_cabinet_worn_long/wood_cabinet_worn_long_diff_1k.jpg')

floorColorTexture.colorSpace = THREE.SRGBColorSpace

const wallColorTexture = textureLoader.load('/textures/castle_brick_broken_06/castle_brick_broken_06_diff_1k.jpg')
const wallNormalTexture = textureLoader.load('/textures/castle_brick_broken_06/castle_brick_broken_06_nor_gl_1k.png')
const wallAORoughnessMetalnessTexture = textureLoader.load('/textures/wood_cabinet_worn_long/wood_cabinet_worn_long_diff_1k.jpg')

wallColorTexture.colorSpace = THREE.SRGBColorSpace

//Floor
const floor = new THREE.PlaneGeometry(10, 10, 10)
const floorTexture = new THREE.MeshStandardMaterial( {side: THREE.DoubleSide});
floorTexture.normalMap = floorNormalTexture;
floorTexture.map = floorColorTexture;
floorTexture.aoMap = floorAORoughnessMetalnessTexture
const floorMesh = new THREE.Mesh(floor, floorTexture)
floorMesh.rotateX(-Math.PI * 0.5)
floorMesh.castShadow = true
scene.add(floorMesh)

//Wall
const wall = new THREE.PlaneGeometry(10, 10, 10)
const wallTexture = new THREE.MeshStandardMaterial( {side: THREE.DoubleSide});
wallTexture.normalMap = wallNormalTexture;
wallTexture.map = wallColorTexture;
wallTexture.aoMap = wallAORoughnessMetalnessTexture
const wallMesh = new THREE.Mesh(wall, wallTexture)
wallMesh.position.z = -5
wallMesh.position.y = 5
//wall.rotateX(Math.PI/1.5)

scene.add(wallMesh)
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(4, 5, 4)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.y = 3.5
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 5))

//Tone mapping
renderer.toneMapping = THREE.ReinhardToneMapping
renderer.toneMappingExposure = 3
gui.add(renderer, 'toneMapping', {
    No: THREE.NoToneMapping,
    Linear: THREE.LinearToneMapping,
    Reinhard: THREE.ReinhardToneMapping,
    Cineon: THREE.CineonToneMapping,
    ACESFilmic: THREE.ACESFilmicToneMapping,
})
gui.add(renderer, 'toneMappingExposure')
    .min(0)
    .max(20)
    .step(0.001)

//Physically accurate lighting
//(Note: the newest version of three.js has legacy lights disabled by default now)
renderer.useLegacyLights = false
gui.add(renderer, 'useLegacyLights')

//Shadows
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFShadowMap


//Rotate Directional Light
const moveDirectionalLight =(elapsedTime) =>{
    directionalLight.position.x = Math.sin((elapsedTime/36) * 3.89999) * 10;
    directionalLight.position.z = Math.cos((elapsedTime/36) * 3.89999) * 10;
   
   
}

/**
 * Animate
 */
const clock = new THREE.Clock()
const tick = () => {
    const elapsedTime = clock.getElapsedTime() 
    // Update controls
    controls.update()

   //Move
    moveDirectionalLight(elapsedTime)

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()