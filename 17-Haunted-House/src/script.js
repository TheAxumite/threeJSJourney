import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { randFloat, randInt } from 'three/src/math/MathUtils'

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

//Fog
const Fog = new THREE.Fog('#262837', 1, 20)
scene.fog = Fog
/**
 * Textures
 */
// Initialize a new instance of the TextureLoader from the THREE.js library.
const textureLoader = new THREE.TextureLoader()

// Load the color texture for the door from the specified path.
const doorTexture = textureLoader.load('/textures/door/color.jpg')

// Load the alpha (transparency) texture for the door.
const alphaDoorTexture = textureLoader.load('/textures/door/alpha.jpg')

// Load the ambient occlusion texture for the door (enhances depth and shading).
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')

// Load the height map texture for the door (provides depth information).
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')

// Load the metalness texture for the door (defines how metallic the surface appears).
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')

// Load the roughness texture for the door (defines how rough or smooth the surface appears).
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

// Load the normal texture for the door (used for detailed surface shading).
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')

// Load the color texture for the bricks.
const bricksColorTexture = textureLoader.load('/textures/bricks/color.jpg')

// Load the ambient occlusion texture for the bricks.
const bricksAmbientOcclusionTexture = textureLoader.load('/textures/bricks/ambientOcclusion.jpg')

// Load the normal texture for the bricks.
const bricksNormalTexture = textureLoader.load('/textures/bricks/normal.jpg')

// Load the roughness texture for the bricks.
const bricksRoughnessTexture = textureLoader.load('/textures/bricks/roughness.jpg')

// Load the color texture for the grass.
const grassColorTexture = textureLoader.load('/textures/grass/color.jpg')

// Load the ambient occlusion texture for the grass.
const grassAmbientOcclusionTexture = textureLoader.load('/textures/grass/ambientOcclusion.jpg')

// Load the normal texture for the grass.
const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg')

// Load the roughness texture for the grass.
const grassRoughnessTexture = textureLoader.load('/textures/grass/roughness.jpg')

grassColorTexture.repeat.set(8, 8)
grassAmbientOcclusionTexture.repeat.set(8, 8)
grassNormalTexture.repeat.set(8, 8)
grassRoughnessTexture.repeat.set(8, 8)

grassColorTexture.wrapS = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
grassNormalTexture.wrapS = THREE.RepeatWrapping
grassRoughnessTexture.wrapS = THREE.RepeatWrapping

grassColorTexture.wrapT = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
grassNormalTexture.wrapT = THREE.RepeatWrapping
grassRoughnessTexture.wrapT = THREE.RepeatWrapping
/**
 * House
 */

//Group
const house = new THREE.Group();
scene.add(house)


//Walls
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({
        map: bricksColorTexture,
        transparent: true,
        aoMap: bricksAmbientOcclusionTexture,
        normalMap: bricksNormalTexture,
        roughnessMap: bricksRoughnessTexture
    }),

)
walls.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2))

walls.position.y = 2.5 / 2
house.add(walls)

//Roof
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, 2, 4, 1),
    new THREE.MeshStandardMaterial({ color: '#b35f45' })

)
roof.position.y = 3.5
roof.rotation.y = Math.PI / 4
house.add(roof)

//Door
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2.2, 100, 100),
    new THREE.MeshStandardMaterial({
        map: doorTexture,
        transparent: true, alphaMap: alphaDoorTexture,
        aoMap: doorAmbientOcclusionTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.1,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture
    })
)
console.log(door.geometry.attributes.uv.array)
door.geometry.setAttribute('uv2', [door.geometry.attributes.uv.array])
// door.rotation.z = Math.PI/2
door.position.z = 2.001
door.position.y = 1

house.add(door)

//Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({ color: '#89c854' })

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.scale.set(0.5, 0.5, 0.5)
bush1.position.set(0.9, 0.2, 2.5)

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(0.25, 0.25, 0.25)
bush2.position.set(1.5, 0.2, 2.3)

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.set(0.4, 0.4, 0.4)
bush3.position.set(-1.0, 0.2, 2.2)

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.scale.set(0.15, 0.15, 0.15)
bush4.position.set(-1.2, 0.2, 2.6)

house.add(bush1, bush2, bush3, bush4)

//Graves

const graves = new THREE.Group()
scene.add(graves);


const graveGeometry = new THREE.BoxGeometry(1, 4, 3);
const graveMaterial = new THREE.MeshStandardMaterial({ color: '#b2b6b1' })


let randomX, randomZ;
let vertex = []
let check
let check2

for (let i = 0; i < 50; i++) {
    const grave = new THREE.Mesh(graveGeometry, graveMaterial);
    grave.scale.set(0.15, 0.15, 0.15);
    grave.rotation.y = (Math.PI / 2) + randFloat(-0.1, 0.2);
    grave.rotation.z = randFloat(-0.3, 0.1);

    const angle = Math.random() * Math.PI * 9;
    randomX = Math.sin(angle) * randFloat(4, 10)
    randomZ = Math.cos(angle) * randFloat(4, 10)
    // do {
    //     randomX = randFloat(-9,9);
    //     randomZ = randFloat(-9,9);
    //     console.log(check)
    // } while ((randomX < 2 && randomX > -3) || (randomZ < 2 && randomZ > -2) || ( check = vertex.some(element => element[0] == (randomX))) || (check2 = vertex.some(element => element[1] == randomZ)))

    // vertex.push([randomX,randomZ])


    grave.position.set(randomX, (3.5 * .15) / 2, randomZ);
    grave.castShadow = true
    graves.add(grave);
}

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({
        map: grassColorTexture,
        aoMap: grassAmbientOcclusionTexture,
        normalMap: grassNormalTexture,
        displacementScale: 0.1,
        roughnessMap: grassRoughnessTexture
    }))
floor.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2))
floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0

scene.add(floor)

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.12)
moonLight.position.set(4, 5, - 2)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(moonLight)

//Door Light
const doorLight = new THREE.PointLight('#ff7d46', 1, 7)
doorLight.position.set(0, 2.24, 2.4)
house.add(doorLight)

/**
 * Ghosts
 */

const ghost1 = new THREE.PointLight('#ff00ff', 2, 3)
ghost1.position.z = 6;


const ghost2 = new THREE.PointLight('#ffffff', 2, 3)
ghost2.position.z = 8;
ghost2.position.y = 1.5;

const ghost3 = new THREE.PointLight('#ffff00', 2, 3)
ghost3.position.z = 8;
ghost3.position.y = 1.5;
scene.add(ghost1, ghost2, ghost3)


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
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
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
renderer.setClearColor('#262837')

// Create an AxesHelper object with a given size
var axesHelper = new THREE.AxesHelper(2);

// Add it to your scene
scene.add(axesHelper);

/**
 * Shadows
 */
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap


moonLight.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true

walls.castShadow = true
roof.castShadow = true
bush1.castShadow = true
bush2.castShadow = true
bush3.castShadow = true

floor.receiveShadow = true;

doorLight.shadow.mapSize.width = 256
doorLight.shadow.mapSize.height = 256;
doorLight.shadow.camera.far = 7

ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256;
ghost1.shadow.camera.far = 7

ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost2.shadow.camera.far = 7

ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.camera.far = 7


/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    //Update Ghosts
    const ghost1Angle = elapsedTime
    ghost1.position.x = Math.sin(ghost1Angle) * 5
    ghost1.position.z = Math.cos(ghost1Angle) * 5
    ghost1.position.y = 1 + Math.abs(Math.cos(ghost1Angle * 0.5))

    const ghost1Angle2 = -elapsedTime * 0.32
    ghost2.position.x = Math.sin(ghost1Angle2) * 5
    ghost2.position.z = Math.cos(ghost1Angle2) * 1
    ghost2.position.y = 1 + Math.abs(Math.cos(ghost1Angle * 0.5))

    const ghost1Angle3 = -elapsedTime * 0.15
    ghost3.position.x = Math.sin(ghost1Angle3) * (10 + Math.sin(elapsedTime))
    ghost3.position.z = Math.cos(ghost1Angle3) * (2 + Math.cos(elapsedTime))
    ghost2.position.y = 1 + Math.abs(Math.cos(ghost1Angle * 0.5))

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()