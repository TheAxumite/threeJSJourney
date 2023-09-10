import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

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
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const particleTexture = textureLoader.load('/textures/particles/4.png')

/**
 * Galaxy
 */
const parameters = {}
parameters.count = 274900
parameters.size = 0.01
parameters.radius = 5
parameters.branches = 8
parameters.spin = 2
parameters.randomness = 0.2
parameters.randomnessPower = 2.146
parameters.insideColor = '#ff6030'
parameters.outsideColor = '#1b3984'

let particlesGeometry = null
let vertices = null
let particlesMaterial = null
let particles = null




const generateGalaxy = function () {
    /**
     * Destroy galaxy
     */

    if (particles) {
        scene.remove(particles)
        particlesGeometry.dispose()
        particlesMaterial.dispose()
        vertices = null
    }

    /**
     * Geometry
     */
    particlesGeometry = new THREE.BufferGeometry();

    vertices = new Float32Array(parameters.count * 3)

    const color = new Float32Array(parameters.count * 3);
    const colorInside = new THREE.Color(parameters.insideColor);
    const colorOutside = new THREE.Color(parameters.outsideColor);

    console.log(colorInside)

    for (let i = 0; i < parameters.count; i++) {

        const i3 = i * 3

        const radius = (Math.random() * parameters.radius)

        const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2
        const spinAngle = radius * parameters.spin

        const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.4 ? 1 : -1)
        const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
        const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.4 ? 1 : -1)
        
        vertices[i3 + 0] = Math.random() < 0.75 ? Math.cos(branchAngle + spinAngle) * radius + randomX : (Math.cos(branchAngle + spinAngle) * (radius * 0.50) + randomX)
        vertices[i3 + 1] = randomY + (vertices[i3 + 0]+vertices[i3 + 2] * -0.001)
        
        vertices[i3 + 2] =  Math.random() < 0.75 ? Math.sin(branchAngle + spinAngle) * radius + randomZ : (Math.sin(branchAngle + spinAngle) * (radius * 0.50) + randomZ)

        //Color
        const mixedColor = colorInside.clone();
        mixedColor.lerp(colorOutside, radius / parameters.radius)

        color[i3] = mixedColor.r
        color[i3 + 1] = mixedColor.g
        color[i3 + 2] = mixedColor.b



    }


    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(color, 3))


    //Material
    particlesMaterial = new THREE.PointsMaterial({
        alphaMap: particleTexture,
        size: parameters.size,
        vertexColors: true,
        sizeAttenuation: true,
        depthTest: false,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending
    })

    //Points
    particles = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particles)


}

generateGalaxy()

gui.add(parameters, 'count').min(100).max(1000000).step(100).onFinishChange(() => generateGalaxy())
gui.add(parameters, 'size').min(0.001).max(0.1).step(0.01).onFinishChange(() => generateGalaxy())
gui.add(parameters, 'radius').min(0.01).max(20).step(0.01).onFinishChange(() => generateGalaxy())
gui.add(parameters, 'branches').min(2).max(20).step(1).onFinishChange(() => generateGalaxy())
gui.add(parameters, 'spin').min(-5).max(5).step(1).onFinishChange(() => generateGalaxy())
gui.add(parameters, 'randomness').min(0).max(2).step(0.001).onFinishChange(() => generateGalaxy())
gui.add(parameters, 'randomnessPower').min(1).max(10).step(0.001).onFinishChange(() => generateGalaxy())
gui.addColor(parameters, 'insideColor').min(1).max(10).step(0.001).onFinishChange(() => generateGalaxy())
gui.addColor(parameters, 'outsideColor').min(1).max(10).step(0.001).onFinishChange(() => generateGalaxy())

// scene.add()

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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 9999)
camera.position.x = 3
camera.position.y = 3
camera.position.z = 2
camera.lookAt(particles)
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

    //Animate
    particles.rotation.y = elapsedTime * parameters.spin * 0.005



    particlesGeometry.attributes.position.needsUpdate = true;

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()