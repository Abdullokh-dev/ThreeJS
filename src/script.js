import * as THREE from 'three';
import gsap from 'gsap';

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/**
 * Object
 */

const group = new THREE.Group();
scene.add(group);

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 'red' }),
);

group.add(cube1);

// Axes helper
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

// Clock
// let clock = new THREE.Clock();

gsap.to(cube1.position, { duration: 1, delay: 1, x: 2 });
gsap.to(cube1.position, { duration: 1, delay: 2, x: 0 });

// Animation
const tick = () => {
    // Clock
    // let elapsedTime = clock.getElapsedTime();

    // Update objects
    // cube1.position.y = Math.sin(elapsedTime);

    // Render
    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
}

tick();