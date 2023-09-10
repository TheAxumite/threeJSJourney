import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'


/**
 * Debug
 */

const gui = new dat.GUI();


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


//Loading Manager
const loadingManager = new THREE.LoadingManager();

loadingManager.onStart = () => 
{
    console.log('onStart')
}

loadingManager.onProgress = () => 
{
    console.log('onProgress')
}

loadingManager.onError = () => 
{
    console.log('onError')
}

loadingManager.onLoad = () => 
{
    console.log('onLoaded')
}


//Texutres
const textures = new THREE.TextureLoader(loadingManager);
const cubeTextureLoader = new THREE.CubeTextureLoader();

const doorcolorTexture = textures.load('/textures/door/color.jpg')
const dooralphaTexure = textures.load('/textures/door/alpha.jpg')
const doorambientOcclusionTexture = textures.load('/textures/door/ambientOcclusion.jpg')
const doorheightTexture = textures.load('/textures/door/height.jpg')
const doormetalnessTexture = textures.load('/textures/door/metalness.jpg')
const doornormalTexture = textures.load('/textures/door/normal.jpg')
const doorroughnessTexture = textures.load('/textures/door/roughness.jpg')
const gradientTexture = textures.load('/textures/gradients/3.jpg')
const matcapTexture = textures.load('/textures/matcaps/3.png')
gradientTexture.minFilter = THREE.NearestFilter;
gradientTexture.magFilter = THREE.NearestFilter;
gradientTexture.generateMipmaps = false;

const enviromentMapTexture = cubeTextureLoader.load([
    '/textures/environmentMaps/1/px.jpg',
    '/textures/environmentMaps/1/nx.jpg',
    '/textures/environmentMaps/1/py.jpg',
    '/textures/environmentMaps/1/ny.jpg',
    '/textures/environmentMaps/1/pz.jpg',
    '/textures/environmentMaps/1/nz.jpg'

])

/**
 * Objects
 */
//const material = new THREE.MeshBasicMaterial()

// const material = new THREE.MeshNormalMaterial()
//material.flatShading = true

// const material = new THREE.MeshMatcapMaterial();
// material.matcap = matcapTexture

// //material.color.set(0xff00ff);
// //material.map = doorcolorTexture;
// // //material.wireframe = true;
// // material.opacity = 0.5
// material.transparent = true;
// //material.alphaMap = dooralphaTexure
// //material.bumpMap = doorheightTexture



// const material = new THREE.MeshLambertMaterial();

// const material = new THREE.MeshPhongMaterial();
// material.side = THREE.DoubleSide
// material.shininess = 50;
// material.specular = new THREE.Color(0x188ff)

// const material = new THREE.MeshToonMaterial()
// material.gradientMap = gradientTexture

// Create a standard mesh material. This is a physically-based material type in Three.js.
const material = new THREE.MeshStandardMaterial();

// The metalness property controls how "metallic" the material appears. 0.0 means the material is "dielectric" (like wood or plastic), and 1.0 means the material is fully metallic. 
material.metalness = 0.7
// The roughness property controls how "rough" or "smooth" the material appears. 0.0 means the material is completely smooth, like a mirror, and 1.0 means the material is fully rough, scattering light in all directions equally.
material.roughness = 0.2;

material.envMap = enviromentMapTexture



// The map property is used to apply a texture to the material, in this case a door color texture.
material.map = doorcolorTexture;

// The side property controls which sides of a face will be rendered. THREE.DoubleSide means both sides will be rendered. This line is commented out, so it's not in effect.
// //material.side = THREE.DoubleSide;

// The aoMap property is used to apply an ambient occlusion map, which is a texture that determines how much ambient light (light not coming from a specific direction) can hit a point on the surface.
// material.aoMap = doorambientOcclusionTexture;

// The aoMapIntensity property controls the strength of the ambient occlusion effect.
// material.aoMapIntensity = 1;

// The displacementMap property is used to apply a displacement map, which is a texture that defines how much each vertex of a face is moved along its normal. It creates a surface that appears more complex than the geometry actually is.
// material.displacementMap = doorheightTexture;

//The displacementScale property controls the intensity of the displacement effect.
// material.displacementScale = 0.05;

// The metalnessMap property is used to apply a metalness map, which is a texture that determines the metalness of each point on the surface.
// material.metalnessMap = doormetalnessTexture;

// The roughnessMap property is used to apply a roughness map, which is a texture that determines the roughness of each point on the surface.
// material.roughnessMap = doorroughnessTexture;

// The normalMap property is used to apply a normal map, which is a texture that alters the direction the surface is facing, making it look more complex without changing the geometry.
// material.normalMap = doornormalTexture;

// The normalScale property controls the intensity of the normal map effect.
// material.normalScale.set(0.5, 0.5);

// The transparent property defines whether this material is transparent. This does not affect fully opaque or fully transparent parts of the material, but can still create a transparency effect with semi-transparent textures.
// material.transparent = true;

// The alphaMap property is used to apply an alpha map, which is a grayscale texture where black is fully transparent and white is fully opaque.
// material.alphaMap = dooralphaTexure;



gui.add(material, 'metalness').min(0).max(1).step(0.0001)
gui.add(material, 'roughness').min(0).max(1).step(0.0001)
gui.add(material, 'aoMapIntensity').min(0).max(10).step(0.0001)
gui.add(material, 'displacementScale').min(0).max(10).step(0.0001)


const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 100, 100),
    material
);
sphere.position.x = 1.5;

sphere.geometry.setAttribute(
    'uv2',
    new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2)
)


const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 100,100),
    material
);

plane.geometry.setAttribute(
    'uv2',
    new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2)
)


const torus = new THREE.Mesh(
    new THREE.TorusGeometry(.3, .2, 64, 128, 6.283185307),
    material
);

torus.position.x = -1.5;

torus.geometry.setAttribute(
    'uv2',
    new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2)
)

scene.add(sphere, plane, torus);

/**
 * Lights
 */

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

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
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    //Update objects
    sphere.rotation.y = elapsedTime  * 0.1;
    plane.rotation.y = elapsedTime  * 0.1;
    torus.rotation.y = elapsedTime  * 0.1;

    sphere.rotation.x = elapsedTime  * 0.1;
    plane.rotation.x = elapsedTime  * 0.1;
    torus.rotation.x = elapsedTime  * 0.1;

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()