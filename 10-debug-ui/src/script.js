import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import * as dat from 'dat.gui'

/**
 *  Debug
 */
const gui = new dat.GUI();

const parameters = {
    color: 0xff0000,
  
    spin: () =>
    {
        gsap.to(mesh.rotation,{duration: 200, y:mesh.rotation.y + 1000 })
    }
}


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(parameters.width,  parameters.height, parameters.depth)
const material = new THREE.MeshBasicMaterial({ color: parameters.color })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

//Debug
gui.add(mesh.position, 'x').min(-3).max(2).step(0.01).name('Longtiude');
gui.add(mesh.position, 'y').min(-3).max(2).step(0.01).name('Latitude');
gui.add(mesh.position, 'z').min(-3).max(2).step(0.01).name('Z-Axis');

gui.add(mesh, 'visible');

gui.add(material, 'wireframe');

gui.addColor(parameters, 'color').onChange(()=> material.setValues({color: parameters.color} ))
gui.add(parameters, 'spin')


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
    console.log(sizes.width, sizes.height)
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
camera.position.z = 3
scene.add(camera)

gui.add(camera.position, 'x')
gui.add(camera.position, 'y')

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()
    

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()