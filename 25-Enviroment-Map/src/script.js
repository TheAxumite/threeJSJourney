import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { EXRLoader } from 'three/addons/loaders/EXRLoader.js'
import { GroundProjectedSkybox } from 'three/examples/jsm/objects/GroundProjectedSkybox.js'

/**
 * Loaders
 */
const gltfLoader = new GLTFLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()
const rgbeLoader = new RGBELoader()
const exrLoader = new EXRLoader()
const textureloader = new THREE.TextureLoader()

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
            enviromentIntensity.push(child)
        }
    })

}
/**
 * Enviroment Map
 */
scene.backgroundBlurriness = 0
scene.backgroundIntensity = 1

gui.add(scene, 'backgroundBlurriness')
    .min(0)
    .max(0.5)
    .step(0.0001)

gui.add(scene, 'backgroundIntensity')
    .min(0)
    .max(10)
    .step(0.0001)


//Global intensity
global.envMapIntensity = 1
gui.add(global, 'envMapIntensity')
    .min(0)
    .max(10)
    .step(0.001)
    .onChange(updateAllMaterials)


/**
 * Enviroment
 */
// LDR cube texture
// const enviromentMapTexture = cubeTextureLoader.load([
//     '/environmentMaps/1/px.png',
//     '/environmentMaps/1/nx.png',
//     '/environmentMaps/1/py.png',
//     '/environmentMaps/1/ny.png',
//     '/environmentMaps/1/pz.png',
//     '/environmentMaps/1/nz.png',

// ])

// scene.environment = enviromentMapTexture
// scene.background = enviromentMapTexture


//HDR (RGBE) equirectangular
// const enviromentMapTextureHDR = rgbeLoader.load('/environmentMaps/blender-2k.hdr', (enviromentMap) => {
//     enviromentMap.mapping = THREE.EquirectangularReflectionMapping

//     // scene.background = enviromentMap
//     scene.environment = enviromentMap
// })

//HDR(EXR) equirectangular
// const enviromentMapTextureHDR= exrLoader.load('/environmentMaps/nvidiaCanvas-4k.exr', (enviromentMap) => {

//     enviromentMap.mapping = THREE.EquirectangularReflectionMapping

//     scene.background = enviromentMap
//     scene.environment = enviromentMap
// })

// LDR equirectangular 
// const enviromentMapTextureHDR = textureloader.load('/environmentMaps/blockadesLabsSkybox/realistic_scifi_bedroom_orange.jpg', (enviromentMap) => {

//     enviromentMap.mapping = THREE.EquirectangularReflectionMapping
//     enviromentMap.colorSpace = THREE.SRGBColorSpace
//     scene.environment = enviromentMap
//     scene.background = enviromentMap

// })
// const groundGeometry = new THREE.PlaneGeometry(5, 5);
// const groundMaterial = new THREE.MeshStandardMaterial({

//     envMap: enviromentMapTextureHDR,
//     roughness: 0.3, 
//     transparent: true,
//     metalness: 1 
// });
// const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
// groundMesh.rotation.x = -Math.PI/2
// groundMesh.castShadow = true
// scene.add(groundMesh);
// groundMaterial.reflectivity = 20

//Ground projected skybox
// const enviromentMapTextureHDR = rgbeLoader.load('/environmentMaps/2/2k.hdr', (enviromentMap) => {
//     enviromentMap.mapping = THREE.EquirectangularReflectionMapping
//     scene.environment = enviromentMap

//     //Skybox
//     const skybox = new GroundProjectedSkybox(enviromentMap)
//     skybox.scale.setScalar(50)
//     scene.add(skybox)

//     gui.add(skybox, 'radius', 1, 200, 0.1).name('skyboxRadius')
//     gui.add(skybox, 'height', 1, 200, 0.1).name('skyBoxRadius')
// })

/**
 * Real time enviroment map
 */

const enviromentMap = textureloader.load('/environmentMaps/blockadesLabsSkybox/interior_views_cozy_wood_cabin_with_cauldron_and_p.jpg')
enviromentMap.mapping = THREE.EquirectangularReflectionMapping
enviromentMap.colorSpace = THREE.SRGBColorSpace

scene.background = enviromentMap


//Holy donut
const holyDonut = new THREE.Mesh(
    new THREE.TorusGeometry(8, 0.5),
    new THREE.MeshBasicMaterial({ color: new THREE.Color(10, 4, 2) })

)
holyDonut.layers.enable(1)
holyDonut.position.y = 3.5

scene.add(holyDonut)

//Cube render target
const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256, { type: THREE.FloatType })
scene.environment = cubeRenderTarget.texture

//Cube Camera
const cubeCamera = new THREE.CubeCamera(0.1, 100, cubeRenderTarget)
cubeCamera.layers.set(1)
/**
 * Torus Knot
 */
const torusKnot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1, 0.4, 100, 16),
    new THREE.MeshStandardMaterial({ roughness: 0, metalness: 1, color: 0xaaaaaa })
)

torusKnot.position.x = -4
torusKnot.position.y = 4

scene.add(torusKnot)


/**
 * Models
 */

gltfLoader.load(
    '/models/FlightHelmet/glTF/FlightHelmet.gltf',
    (gltf) => {

        // gltf.scene.children.forEach(element => {

        //     element.material.envMapIntensity = 2.4
        //     element.material.envMap=enviromentMapTexture
        // });

        gltf.scene.scale.set(10, 10, 10)
        scene.add(gltf.scene)
        updateAllMaterials()
    })
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
controls.target.y = 3.0
controls.enableDamping = true
// controls.autoRotate = true
// controls.rotateSpeed = 5

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

//Rotation
const rotateMeshes = (elapsedTime) => {
    scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {


            if (child.geometry.type == "TorusGeometry") {
                // child.position.x = Math.sin(elapsedTime * Math.PI * 2) * 8
                child.rotation.x = Math.sin(elapsedTime) * 10;
                cubeCamera.update(renderer, scene)


            }
        }
    })
}
/**
 * Animate
 */
const clock = new THREE.Clock()
const tick = () => {
    // Time
    const elapsedTime = clock.getElapsedTime() * 0.05

    cubeCamera.update(renderer, scene)

    // Update controls
    controls.update()

    //Rotate
    rotateMeshes(elapsedTime)

    // if (holyDonut) {

    //     holyDonut.rotation.x = Math.sin(elapsedTime) * 2

    //     cubeCamera.update(renderer, scene)

    // }

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()