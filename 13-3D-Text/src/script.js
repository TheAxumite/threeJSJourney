import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { randFloat, randInt } from 'three/src/math/MathUtils';


THREE.ColorManagement.enabled = false

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//Axes helper 
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper)

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load('/textures/matcaps/7.png')
const material = new THREE.MeshMatcapMaterial();
material.matcap = matcapTexture;
const textMaterial = new THREE.MeshBasicMaterial();
textMaterial.wireframe = true;


/**
 * Fonts
 */

const fontLoader = new FontLoader();
const font = fontLoader.load(
    // resource URL
    '/fonts/helvetiker_regular.typeface.json',

    // onLoad callback
    function (font) {
        const geometry = new TextGeometry(
            'Hello Three.js',
            {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 5,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 4
            })

        //METHOD 1: For Centering Geometry 
        geometry.computeBoundingBox();
        // geometry.translate(
        //     - (geometry.boundingBox.max.x - 0.02) * 0.5,
        //     - (geometry.boundingBox.max.y -0.02) * 0.5,
        //     - (geometry.boundingBox.max.z - 0.03) * 0.5,
        // )

        const text = new THREE.Mesh(geometry, material)

        //METHOD 2: For Centering Geometry 
        text.position.x = (geometry.boundingBox.min.x - geometry.boundingBox.max.x - 0.02) / 2;
        text.position.y = (geometry.boundingBox.min.y - geometry.boundingBox.max.y - 0.02) / 2;
        text.position.z = (geometry.boundingBox.min.z - geometry.boundingBox.max.z - 0.02) / 2;

        //METHOD 3: For Centering Geometry 
        //geometry.center();
        scene.add(text)
        console.time('Donuts')
        const donutGeometry = new THREE.TorusGeometry(.3, .2, 25, 30, Math.PI * 2)
        
        for (let i = 0; i < 1000; i++) {

            var torus = new THREE.Mesh(donutGeometry, material);
            torus.position.x = randFloat(-5,20)
            torus.position.y = randFloat(-5,50)
            torus.position.z = randFloat(-5,10)
            torus.position.y = randFloat(-5,7)
            torus.position.z = randFloat(-5,7)
            torus.rotation.x = randFloat(-5,7);
            torus.rotation.z = randFloat(-5,7);
            const scale = randFloat(-2,2)
            torus.scale.set(scale,scale,scale)
            scene.add(torus)
        }
        console.timeEnd('Donuts')
    },

    // onProgress callback
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },

    // onError callback
    function (err) {
        console.log('An error happened');
    }
);



// /**
//  * Object
//  */
// const cube = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial(),

// )


// scene.add(cube)

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
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.outputColorSpace = THREE.LinearSRGBColorSpace
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()