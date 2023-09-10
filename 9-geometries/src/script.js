import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
//Create a box using the BoxGeometry Class
//const geometry = new THREE.BoxGeometry(1, 1, 1,2,2,2)

//Create a square by storing their verticies in a Float32Array object type
//const positionArray = new Float32Array([
	//-1.0, -1.0,  1.0, // v0
	 //1.0, -1.0,  1.0, // v1
	// 1.0,  1.0,  1.0, // v2

	// 1.0,  1.0,  1.0, // v3
	//-1.0,  1.0,  1.0, // v4
	//-1.0, -1.0,  1.0  // v5
//])

//positionArray[0] = 0;
//positionArray[1] = 0;
//positionArray[2] = 0;

//positionArray[3] = 0;
//positionArray[4] = 1;
//positionArray[5] = 0;

//positionArray[6] = 1;
//positionArray[7] = 0;
//positionArray[8] = 0;

//const positionAttribute = new THREE.BufferAttribute(positionArray, 3)

const geometry = new THREE.BufferGeometry();

const count = 4;
const positionArray = new Float32Array(count * 9)

for(let i = 0; i < count * 9; i++)
{
    if(i == 4 || i == 6 || i == 9 || i==12 || i==13 || i == 16 || i == 20 ||  i== 22 || i == 23 || i==24 || i==26 || i==29 || i==31 || i == 32|| i== 33  || i ==35 || i== 36)
    {
        positionArray[i] = 1
    
    }
    else
    {
        positionArray[i] = 2
    }
    
}

const positionAttribute = new THREE.BufferAttribute(positionArray, 3)

geometry.setAttribute('position', positionAttribute)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
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

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animate
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