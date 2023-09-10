import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { normalize } from 'three/src/math/MathUtils'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
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
 * Objects
 */

// const object1 = new THREE.Mesh(
//     new THREE.SphereGeometry(0.5, 24, 24),
//     new THREE.MeshBasicMaterial({ color: '#ff0000' })
// )
// object1.position.x = - 2

// const object2 = new THREE.Mesh(
//     new THREE.SphereGeometry(0.5, 16, 16),
//     new THREE.MeshBasicMaterial({ color: '#ff0000' })
// )

// const object3 = new THREE.Mesh(
//     new THREE.SphereGeometry(0.5, 16, 16),
//     new THREE.MeshBasicMaterial({ color: '#ff0000' })
// )
// object3.position.x = 2

// object1.updateMatrixWorld()
// object2.updateMatrixWorld()
// object3.updateMatrixWorld()
// scene.add(object1, object2, object3)

/**
 * Models
 */


/**
 * Raycaster
 */
const raycaster = new THREE.Raycaster()



// const rayOrigin = new THREE.Vector3(-3, 0, 0)
// const rayDirection = new THREE.Vector3(10, 0, 0)
// rayDirection.normalize()
// raycaster.set(rayOrigin, rayDirection)

// const intersect = raycaster.intersectObject(object2)
// console.log(intersect)

// const intersects = raycaster.intersectObjects([object1, object2, object3])
// console.log(intersects)
/**
 * 
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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.01, 100)
camera.position.z = 3
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
* Mouse
*/
const mouse = new THREE.Vector2()
mouse.x = 0;
mouse.y = 0;
window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / sizes.width) * 2 - 1
    mouse.y = -(event.clientY / sizes.height) * 2 + 1
    // console.log(mouse)
})

// window.addEventListener('click', (event) => {
//     if (currentIntersect) {
//         if (currentIntersect.object === object1) {
//             console.log('click on object 1')
//         }
//         else if (currentIntersect.object === object2) {
//             console.log('click on object 2')
//         }
//         else if (currentIntersect.object === object3) {
//             console.log('click on object 3')
//         }
//     }
// })


/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight('#ffffff', 0.3)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
directionalLight.castShadow = false
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = - 7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = - 7
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)

/**
 * Models
 */

const gltfLoader = new GLTFLoader()
var Duck = null
gltfLoader.load('/models/Duck/glTF/Duck.gltf',
    (gltf) => {
        Duck = gltf.scene
        gltf.scene.castShadow = false
        gltf.scene.position.y = -1.2
        // gltf.scene.scale.set(0.025,0.025, 0.025)
        scene.add(gltf.scene)

    })
/**
 * Animate
 */
const clock = new THREE.Clock()

let currentIntersect = null

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Animate
    // object1.position.y = Math.sin(elapsedTime * 2)
    // object2.position.y = Math.sin(elapsedTime * 1.8)
    // object3.position.y = Math.sin(elapsedTime * 1.6)
    // console.log(object1.position)




    //Cast Ray
    raycaster.setFromCamera(mouse, camera)
    // const rayOrigin = new THREE.Vector3(camera.position.x + mouse.x, camera.position.y + mouse.y, camera.position.z)
    // const rayDirection = new THREE.Vector3(camera.position.x + mouse.x, camera.position.y + mouse.y, object1.position.z - 2)
    // console.log(camera.position.x)
    // console.log(camera.position.y)
    // rayDirection.normalize()


    // raycaster.set(rayOrigin, rayDirection)

    // const objectsToTest = [object1, object2, object3]
    // const intersects = raycaster.intersectObjects(objectsToTest)
    // for (const intersect of objectsToTest) {
    //     intersect.material.color.set('red')
    // }
    // if (intersects.length > 0) {
    //     if (currentIntersect === null) {
    //         console.log('mouse enter')
    //     }
    //     intersects[0].object.material.color.set('#0000ff')
    //     currentIntersect = intersects[0]
    // }
    // else {
    //     if (currentIntersect) {
    //         console.log('mouse leave')
    //     }
    //     currentIntersect = null
    // }

    if (Duck) {
        const modelIntersects = raycaster.intersectObject(Duck)
        if(modelIntersects.length)
        {
            Duck.scale.set(1.2,1.2,1.2)
        }
        else{
            Duck.scale.set(1,1,1)
        }
        
    }
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()