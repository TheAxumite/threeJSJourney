import * as THREE from 'three'
import gsap from 'gsap'


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
mesh.position.y = 0

scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

//Time
let time = Date.now();

//Clock
const clock = new THREE.Clock();
const tl = gsap.timeline({ repeat: -1, repeatDelay: 0 });

tl.to(mesh.position, { duration: 2, delay:0, x:2 })
tl.to(mesh.position, { duration: 3, delay:0, y:2 })
tl.to(mesh.position, { duration: 1, delay:0, x:0 })
tl.to(mesh.position, { duration: .8, delay:0, y:0 })

//window.requestAnimationFrame() is a method in the Window interface of the Web API. It tells the browser that you wish to perform an animation and requests that the browser calls a specified function to update an animation before the next repaint.
//Animations
const tick = function run() {
    //Time
    const elapsedTime = clock.getElapsedTime();
    console.log(elapsedTime);


    //Update objects
    //mesh.position.y = (elapsedTime/10) * Math.PI * 2;
  //  mesh.position.y = Math.sin(elapsedTime)
    //mesh.position.x = Math.cos(elapsedTime)
    //camera.lookAt(mesh.position)

    
    //mesh.rotation.z +=0.05;


    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
}

tick()
