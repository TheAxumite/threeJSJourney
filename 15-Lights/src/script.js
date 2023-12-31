import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'

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

/**
 * Lights
 */

//Ambient Light
// const AmbientLight = new THREE.AmbientLight();
// AmbientLight.color = new THREE.Color(0xffffff, 0.5)
//scene.add(AmbientLight)

//Directional Light
const directionalLight= new THREE.DirectionalLight(0x00fffc, 0.5)
directionalLight.position.set(-1,0, 0)
scene.add(directionalLight)

const heimsphereLight = new THREE.HemisphereLight(0x0000cc, 0xcc0000,0.5)
const heimsphereLightHelper = new THREE.HemisphereLightHelper(heimsphereLight, 0.2)
scene.add(heimsphereLight, heimsphereLightHelper)

const pointLight = new THREE.PointLight(0xff9000, 0.5,10,0.1)
pointLight.position.set(0,1.5,0)
scene.add(pointLight)


const rectAreaLight = new THREE.RectAreaLight(0x78ff00,0.5,4,4)
rectAreaLight.position.set(0,2.5,3.4)
rectAreaLight.lookAt(new THREE.Vector3())
scene.add(rectAreaLight)

const spotLight = new THREE.SpotLight(0x78ff00, 0.5, 10, Math.PI * 0.20 , 0.25, 0.05)
spotLight.position.set(-1,2,1)
spotLight.target.position.x = -0.5
scene.add(spotLight, spotLight.target)

const spotLightTwo = new THREE.SpotLight(0xff0000, 0.5, 10, Math.PI * 0.01 , 0.25, 0.05)
spotLightTwo.position.set(-1,1,5)
spotLightTwo.target.position.x = 1.3
scene.add(spotLightTwo, spotLightTwo.target)

const spotLighThree = new THREE.SpotLight(0xffff00, 0.5, 10, Math.PI * 0.01 , 0.25, 0.05)
spotLighThree.position.set(-1.5,1,5)
spotLighThree.target.position.x = 0
scene.add(spotLighThree, spotLighThree.target)


const spotLighFour = new THREE.SpotLight(0x00ff00, 0.5, 10, Math.PI * 0.01 , 0.25, 0.05)
spotLighFour.position.set(-1.5,1,5)
spotLighFour.target.position.x = -1.3
scene.add(spotLighFour, spotLighFour.target)

/**
 * Helpers
 */
const HemisphereLightHelper = new THREE.HemisphereLightHelper(heimsphereLight, 0.2);
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2)
const pointLightHelper = new THREE.PointLight(pointLight, 0.2)
const spotLightHelper = new THREE.SpotLightHelper(spotLight)
const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight) 
scene.add(HemisphereLightHelper, directionalLightHelper, pointLightHelper,spotLightHelper,rectAreaLightHelper)


gui.add(directionalLight, 'intensity').min(0).max(1).step(0.01)
gui.addColor(directionalLight, 'color').min(0).max(1).step(0.01)
gui.add(heimsphereLight, 'intensity').min(0).max(1).step(0.01)
gui.add(rectAreaLight, 'intensity').min(0).max(1).step(0.01)
gui.add(pointLight, 'intensity').min(0).max(1).step(0.01)

/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4

// Objects
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)
sphere.position.x = - 1.5

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 32, 64),
    material
)
torus.position.x = 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65

scene.add(sphere, cube, torus, plane)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
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

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    cube.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    cube.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()