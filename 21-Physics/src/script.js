import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import * as CANNON from 'cannon-es'
import { randFloat } from 'three/src/math/MathUtils'


THREE.ColorManagement.enabled = false

/**
 * Debug
 */
const gui = new dat.GUI()
const debugObject = {}

debugObject.createSphere = () => {
    createSphere(0.5,
        {
            x: randFloat(-5, 5),
            y: randFloat(2, 8),
            z: randFloat(-1, 1)
        })
}

debugObject.createBox = () => {
    createBox(
        Math.random(),
        Math.random(),
        Math.random(),
        {
            x: randFloat(-5, 5),
            y: randFloat(2, 8),
            z: randFloat(-1, 1)
        })
}

debugObject.reset = () => {
    for (const object of objectsToUpdate) {
        //Remove Body
        object.body.removeEventListener('collide', playHitSound)
        world.removeBody(object.body)

        //Remove mesh
        scene.remove(object.mesh)

        //Empty the objecToUpdate Array

    }
    objectsToUpdate.splice(0, objectsToUpdate.length)
}
gui.add(debugObject, 'createSphere')
gui.add(debugObject, 'createBox')
gui.add(debugObject, 'reset')
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Scene 
 */


const hitSound = new Audio('/sounds/hit.mp3')

const playHitSound = (collision) => {
    const imactStrength = collision.contact.getImpactVelocityAlongNormal()
    if (imactStrength > 1.5) {
        hitSound.volume = Math.random()
        hitSound.currentTime = 0
        hitSound.play()
    }
    if (imactStrength < 1.5) {
        // hitSound.volume = Math.random() 
        hitSound.currentTime = 0.002
        hitSound.play()
    }

}

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()

const environmentMapTexture = cubeTextureLoader.load([
    '/textures/environmentMaps/0/px.png',
    '/textures/environmentMaps/0/nx.png',
    '/textures/environmentMaps/0/py.png',
    '/textures/environmentMaps/0/ny.png',
    '/textures/environmentMaps/0/pz.png',
    '/textures/environmentMaps/0/nz.png'
])

/**
 * Physics
 */

const world = new CANNON.World()
world.broadphase = new CANNON.SAPBroadphase(world)
world.allowSleep = true
world.gravity.set(0, -9.82, 0)

//Materials
const defaultMaterial = new CANNON.Material('default')


//Contact Material: is the combination of two Materials and how they should collide
const defaultContactMaterial = new CANNON.ContactMaterial(
    defaultMaterial,
    defaultMaterial,
    {
        friction: 0.1,
        restitution: 0.9
    }
)
world.addContactMaterial(defaultContactMaterial)
world.defaultContactMaterial = defaultContactMaterial

//Sphere

// const sphereShape = new CANNON.Sphere(0.5)
// const sphereBody = new CANNON.Body({
//     mass: 1,
//     position: new CANNON.Vec3(0, 3, 0),
//     shape: sphereShape

// })
// //applyLocalForce is the same as applyForce but the coordinates are local to the Body (meaning that 0, 0, 0 would be the center of the Body).
// sphereBody.applyLocalForce(new CANNON.Vec3(12, 0, 0), new CANNON.Vec3(0, 0, 0))
// world.addBody(sphereBody)

//Floor

const floorShape = new CANNON.Plane()
const floorBody = new CANNON.Body()
floorBody.mass = 0
floorBody.addShape(floorShape)
floorBody.quaternion.setFromAxisAngle(
    new CANNON.Vec3(-1, 0, 0),
    Math.PI * 0.5)
world.addBody(floorBody)

// /**
//  * Test sphere
//  */
// const sphere = new THREE.Mesh(
//     new THREE.SphereGeometry(0.5, 32, 32),
//     new THREE.MeshStandardMaterial({
//         metalness: 0.3,
//         roughness: 0.4,
//         envMap: environmentMapTexture,
//         envMapIntensity: 0.5
//     })
// )
// sphere.castShadow = true
// sphere.position.y = 0.5
// scene.add(sphere)

/**
 * Floor
 */
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(1000, 1000),
    new THREE.MeshStandardMaterial({

        metalness: 0.3,
        roughness: 0.4,
        envMap: environmentMapTexture,
        envMapIntensity: 1.5
    })
)
floor.receiveShadow = true
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(10000, 10000)
directionalLight.shadow.camera.far = 700
directionalLight.shadow.camera.left = - 700
directionalLight.shadow.camera.top = 700
directionalLight.shadow.camera.right = 700
directionalLight.shadow.camera.bottom = - 10
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2)
const shadowMapcameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
directionalLight.position.set(50, 10, 50)
scene.add(directionalLight)

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
camera.position.set(-3, 17, 0)
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
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Utils
 */

//Boxes
const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
const boxMaterial = new THREE.MeshStandardMaterial({
    metalness: 0.3,
    roughness: 0.4,
    envMap: environmentMapTexture
})



const objectsToUpdate = []


const createBox = (width, height, depth, position) => {
    //Three.js mesh
    const mesh = new THREE.Mesh(boxGeometry, boxMaterial)
    // mesh.material.color.r = parseInt(Math.random() * 10)
    // mesh.material.color.g = parseInt(Math.random() * 10)
    // mesh.material.color.b = parseInt(Math.random() * 10)

    mesh.scale.set(width, height, depth)
    mesh.castShadow = true
    mesh.position.copy(position)

    scene.add(mesh)

    //Cannon.js body
    const shape = new CANNON.Box(new CANNON.Vec3(width * 0.5, height * 0.5, depth * 0.5))
    const body = new CANNON.Body({
        mass: 1,
        postion: new CANNON.Vec3(position.x, position.y, position.z),
        shape,
        material: defaultContactMaterial
    })
    body.position.copy(position)
    body.addEventListener('collide', playHitSound)
    world.addBody(body)

    //save in objects to update
    objectsToUpdate.push({
        mesh: mesh,
        body: body
    })
}




const sphereGeometry = new THREE.SphereGeometry(1, 20, 20)
const sphereMaterial = new THREE.MeshStandardMaterial({
    metalness: 1.3,
    roughness: 0.1,
    envMap: environmentMapTexture
})

const createSphere = (radius, position) => {

    //Three.js mesh
    const mesh = new THREE.Mesh(sphereGeometry, sphereMaterial)
    // mesh.material.color.r = parseInt(Math.random() * 10)
    // mesh.material.color.g = parseInt(Math.random() * 10)
    // mesh.material.color.b = parseInt(Math.random() * 10)
    mesh.scale.set(radius, radius, radius)
    mesh.castShadow = true
    mesh.position.copy(position)
    scene.add(mesh)


    //Cannon.js body
    const shape = new CANNON.Sphere(radius)
    const body = new CANNON.Body({
        mass: 1,
        postion: new CANNON.Vec3(position.x, position.y, position.z),
        shape,
        material: defaultContactMaterial
    })
    body.position.copy(position)
    body.addEventListener('collide', playHitSound)
    world.addBody(body)

    // return {body: body, mesh: mesh}
    //save in objects to update
    objectsToUpdate.push({
        mesh: mesh,
        body: body
    })
}

// const sphereCount = 50

// for (let i = 0; i < sphereCount; i++) {
//     createSphere(0.5, { x: randFloat(-5, 5), y: randFloat(2, 8), z: randFloat(-1, 1) })
// }



/**
 * Animate
 */
const clock = new THREE.Clock()
let oldElapsedTime = 0
let lastTime = Date.now();
const tick = () => {
    let now = Date.now();
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - oldElapsedTime
    const deltaTime2 = now - lastTime
    oldElapsedTime = elapsedTime


    directionalLight.position.set(Math.cos(elapsedTime*0.05)*10, Math.sin(elapsedTime*0.05) *10, 55)
    //Update Physics World
    //1.) Providing a fixed time step    2.) How much time passed since the last step     3.)how much iterations the world can apply to catch up with a potential delay.

    world.step(1 / 60, deltaTime, 3)
    objectsToUpdate.forEach(element => {
        element.body.applyForce(new CANNON.Vec3(-0.001, 0, 0), element.body.position)
        element.mesh.position.x = element.body.position.x
        element.mesh.position.y = element.body.position.y
        element.mesh.position.z = element.body.position.z
        element.mesh.quaternion.copy(element.body.quaternion)
    });
    // Assuming objectsToUpdate is your array of objects in your main script.

    // var simpleObjects = objectsToUpdate.map(obj => {
    //     return {
    //         meshposition: { x: obj.mesh.position.x, y: obj.mesh.position.y, z: obj.mesh.position.z },
    //         bodyposition: { x: obj.body.position.x, y: obj.body.position.y, z: obj.body.position.z },
    //         meshquaternion: { x: obj.mesh.quaternion.x, y: obj.mesh.quaternion.y, z: obj.mesh.quaternion.z, w: obj.mesh.quaternion.w },
    //         bodyquaternion: { x: obj.body.quaternion.x, y: obj.body.quaternion.y, z: obj.body.quaternion.z, w: obj.body.quaternion.w }
    //         // ...any other properties you need to update.
    //     };
    // });

    // const worker = new Worker('worker.js');
    // worker.postMessage({simpleObjects});
    // worker.onmessage = function (event) {
    //    objectsToUpdate = event

    // };


    // Update controls
    if (deltaTime2 >= 2000) {
        createBox(
            Math.random(),
            Math.random(),
            Math.random(),
            {
                x: randFloat(-5, 20),
                y: randFloat(2, 30),
                z: randFloat(-1, 10)
            })

        createSphere(0.5,
            {
                x: randFloat(-5, 5),
                y: randFloat(2, 30),
                z: randFloat(-1, 1)
            })
        createBox(
            Math.random(),
            Math.random(),
            Math.random(),
            {
                x: randFloat(-5, 20),
                y: randFloat(2, 30),
                z: randFloat(-1, 10)
            })

        createSphere(0.5,
            {
                x: randFloat(-5, 5),
                y: randFloat(2, 30),
                z: randFloat(-1, 1)
            })
        lastTime = now
    }

    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
    // worker.terminate();


}
tick()