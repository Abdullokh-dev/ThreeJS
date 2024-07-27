import * as THREE from 'three';
// import {gsap} from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Cursor
const cursor = {
    x: 0,
    y: 0
}
window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width -0.5;
    cursor.y = - (event.clientY / sizes.height -0.5);
})

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl');

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Scene
const scene = new THREE.Scene();

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 'red' })
)
scene.add(mesh);

// Group
// const group = new THREE.Group();
// scene.add(group);
//
// const cube1 = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1, 5, 5 ,5),
//     new THREE.MeshBasicMaterial({ color: 'blue' }),
// );
//
// group.add(cube1);

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 100)
// const aspectRatio = sizes.width / sizes.height;
// camera.position.x = 2;
// camera.position.y = 2;
camera.position.z = 2;
camera.lookAt(mesh.position)
scene.add(camera);

// Axes helper
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

// Controls
const controls = new OrbitControls(camera, canvas);
// controls.target.y = 1;
// controls.update();
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

// Animate
let clock = new THREE.Clock();

// gsap.to(cube1.position, { duration: 1, delay: 1, x: 2 });
// gsap.to(cube1.position, { duration: 1, delay: 2, x: 0 });

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // mesh.rotation.y = elapsedTime;

    // Update camera
    // camera.position.x = Math.sin(cursor.x * Math.PI) * 3;
    // camera.position.z = Math.cos(cursor.x * Math.PI) * 3;
    // camera.position.y = cursor.y * 5;
    // camera.lookAt(mesh.position);

    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
}

tick();