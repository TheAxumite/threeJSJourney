//In Three.js, a scene is a container that holds all your objects, lights, and cameras, which together create the 3D world that gets rendered to the screen.

//Creates a new instance of a Three.js Scene Class, which is assigned to the constant variable scene, to serve as a container for your 3D objects, lights, and cameras.
//Link to information about Scene Class: https://threejs.org/docs/index.html#api/en/scenes/Scene
const scene = new THREE.Scene();

//Red Cube
const geometry = new THREE.BoxGeometry(1, 1, 1);            //geometry — (optional) an instance of BufferGeometry. Default is a new BufferGeometry. Link to BoxGeometry Class: https://threejs.org/docs/index.html#api/en/geometries/BoxGeometry
const material = new THREE.MeshBasicMaterial({ color: 0xFF0000 });  //material — (optional) a single or an array of Material. This material class is not affected by light
const mesh = new THREE.Mesh(geometry, material); //Link to Mesh Class: https://threejs.org/docs/index.html#api/en/objects/Mesh
scene.add(mesh);

//Sizes
const sizes = {
    width:800,
    height: 600
}

//Camera
//Link to Camera
//Constructers for PersepectiveCamera sub-Class (fov — Camera frustum vertical field of view, aspect — Camera frustum aspect ratio, near — Camera frustum near plane, far — Camera frustum far plane.)
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
camera.position.x = 1;
camera.position.y = .05;
scene.add(camera);

//Renderer
const canvas = document.createElement('canvas');
canvas.className = 'webgl';
document.body.append(canvas);
console.log(canvas);

//Renderer(Link: https://threejs.org/docs/index.html#api/en/renderers/WebGLRenderer)
const renderer = new THREE.WebGLRenderer({canvas:canvas});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
