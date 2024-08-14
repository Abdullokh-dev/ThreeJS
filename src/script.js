import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {BoxGeometry, LoadingManager} from "three";
import {gsap} from "gsap";
import GUI from 'lil-gui';

/**
 * Debug
 */
const gui = new GUI({
    width: 300,
    title: 'Nice debug UI',
    closeFolders: false,
});

// gui.close();
// gui.hide();

window.addEventListener('keydown', (event) => {
    if ( event.key == 'h' ) {
        gui.show(gui._hidden);
    }
})

const debugObject = {};

/**
 * Texture
 */
const loadingManager = new LoadingManager();
const textureLoader = new THREE.TextureLoader(loadingManager);
const texture = textureLoader.load('/door.jpg');
texture.colorSpace = THREE.SRGBColorSpace;
// texture.repeat.x = 2;
// texture.repeat.y = 3;
// texture.wrapS = THREE.MirroredRepeatWrapping;
// texture.wrapT = THREE.MirroredRepeatWrapping;
// texture.wrapS = THREE.RepeatWrapping;
// texture.wrapT = THREE.RepeatWrapping;

// texture.offset.x = 0.5;
// texture.offset.y = 0.5;

texture.rotation = Math.PI / 4;
texture.center.x = 0.5;
texture.center.y = 0.5;

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Object
debugObject.color = '#43731c';

const geometry = new BoxGeometry(1, 1,1, 1);
const material = new THREE.MeshBasicMaterial({map: texture});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
const cubeTweaks = gui.addFolder('Awesome cube');

cubeTweaks.add(mesh.position, 'y').min(-3).max(3).step(0.01).name('elevation');
cubeTweaks.add(mesh, 'visible');
cubeTweaks.add(material, 'wireframe');
cubeTweaks.addColor(debugObject, 'color').onChange(() => {
    material.color.set(debugObject.color);
})

debugObject.spin = () => {
    gsap.to(mesh.rotation, {duration: 1, y: mesh.rotation.y + Math.PI * 2});
}

cubeTweaks.add(debugObject, 'spin');

debugObject.subdivision = 2;
cubeTweaks.add(debugObject, 'subdivision').min(1).max(20).step(1).onFinishChange(() => {
    mesh.geometry.dispose();
    mesh.geometry = new BoxGeometry(1, 1,1, debugObject.subdivision, debugObject.subdivision, debugObject.subdivision);
});

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
})

window.addEventListener('dblclick', () => {
    if ( !document.fullscreenElement ) {
        canvas.requestFullscreen();
    } else {
        document.exitFullscreen()
    }
})

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas);
// controls.enabled = false;
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// // Axes helper
// const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper);

// Animate
let clock = new THREE.Clock();

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick();