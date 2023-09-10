import * as THREE from 'three'
import * as dat from 'lil-gui'
import { randFloat } from 'three/src/math/MathUtils'
import gsap from 'gsap'

THREE.ColorManagement.enabled = false

/**
 * Debug
 */
const gui = new dat.GUI()

const parameters = {
    materialColor: '#ff0000'
}


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//Texture
const textLoader = new THREE.TextureLoader()
const gradientTexture = textLoader.load('textures/gradients/3.jpg')
const gradientParticleTexture = textLoader.load('textures/gradients/5.jpg')
gradientTexture.magFilter = THREE.NearestFilter
gradientParticleTexture.magFilter = THREE.NearestFilter

/**
 * Objects
 */
const material = new THREE.MeshToonMaterial({
    color: parameters.materialColor,
    gradientMap: gradientTexture
})

const objectDistance = 4
const mesh1 = new THREE.Mesh(
    new THREE.TorusGeometry(1, 0.4, 16, 60),
    material,

)

const mesh2 = new THREE.Mesh(
    new THREE.ConeGeometry(1, 2, 32),
    material
)

const mesh3 = new THREE.Mesh(
    new THREE.TorusKnotGeometry(.8, 0.35, 100, 16),
    material
)

mesh1.position.y = - objectDistance * 0
mesh2.position.y = - objectDistance * 1
mesh3.position.y = - objectDistance * 2

mesh1.position.x = 2
mesh2.position.x = -2
mesh3.position.x = 2
scene.add(mesh1, mesh2, mesh3)

const sectionMeshes = [mesh1, mesh2, mesh3]
/**
 * Particles
 */

const count = 200
const positions = new Float32Array(count * 3)
const color = new Float32Array(count * 3)


for (let i = 0; i < positions.length; i++) {

    positions[i + 3 + 0] = randFloat(-0.5, 0.5) * 10
    positions[i + 3 + 1] = objectDistance * 0.5 + randFloat(-5.9, 2.9) * objectDistance * sectionMeshes.length
    positions[i + 3 + 2] = randFloat(-0.5, 0.5) * 10
   

}
console.log(positions)
const particlesGeometry = new THREE.BufferGeometry();
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))



const particlesMaterial = new THREE.PointsMaterial({
    color: parameters.materialColor,
    sizeAttenuation: true,
    size: 0.05
    
    

})

//Points
const particles = new THREE.Points(particlesGeometry,particlesMaterial)




/**
 * Lights
 */


const directionalLIght = new THREE.DirectionalLight('#ffffff', 1)
directionalLIght.position.set(1, 1, 1)
directionalLIght.target.position.x = 0
scene.add(directionalLIght)


gui
    .addColor(parameters, 'materialColor')
    .onChange(() => {
    material.color.set(parameters.materialColor)
    particlesMaterial.color.set(parameters.materialColor)
    })
gui
    .add(mesh1.position, 'x').min(-3).max(2).step(0.01).name('X-Axis')

gui.add(directionalLIght.position, 'x').min(-3).max(2).step(0.01).name('X-Axis Light')

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

//Group
const cameraGroup = new THREE.Group()
scene.add(cameraGroup)
// Base camera
const camera = new THREE.PerspectiveCamera(65, sizes.width / sizes.height, 0.1, 1000)
camera.position.z = 6
cameraGroup.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.outputColorSpace = THREE.LinearSRGBColorSpace
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Scroll
 */

let scrollY = window.scrollY
let currrentSection = 0


window.addEventListener('scroll', () => {
    scrollY = window.scrollY
    camera.position.y = -scrollY / sizes.height * objectDistance
    const newSection = Math.round(scrollY/sizes.height)
    if(newSection != currrentSection){
        currrentSection = newSection
        gsap.to(
            sectionMeshes[currrentSection].rotation,
            {
                duration: 1.5,
                ease: 'power2.inOut',
            x: '+=6',
            y: '+=3',
            z:'+=1.5'
            }
        )

    }
    
})
console.log(sizes.height)

/**
 * Cursor
 */
const cursor = {}
cursor.x = 0;
cursor.y = 0;

window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width + -0.5
    cursor.y = event.clientY / sizes.height + -0.5

})

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0
scene.add(particles)
const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    //Animate camera
    camera.position.y = -scrollY / sizes.height * objectDistance

    const parallaxX =  cursor.x * 0.5
    const parallaxY = - cursor.y * 0.5

    cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 5 * deltaTime
    cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 5 * deltaTime

    sectionMeshes.forEach(mesh => {
        mesh.rotation.x += deltaTime * .1
        mesh.rotation.y += deltaTime * .12
       


    });

   

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()