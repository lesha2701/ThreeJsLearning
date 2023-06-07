import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import './style.css'

import earthTexture from './img/earth.jpg';
import jupiterTexture from './img/jupiter.jpg';
import marsTexture from './img/mars.jpg';
import mercuryTexture from './img/mercury.jpg';
import neptuneTexture from './img/neptune.jpg';
import plutoTexture from './img/pluto.jpg';
import saturnRingTexture from './img/saturn ring.png';
import saturnTexture from './img/saturn.jpg';
import starsTexture from './img/stars.jpg';
import sunTexture from './img/sun.jpg';
import uranusRingTexture from './img/uranus ring.png';
import uranusTexture from './img/uranus.jpg';
import venusTexture from './img/venus.jpg';

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const orbit = new OrbitControls(camera, renderer.domElement);
camera.position.set(-90, 140, 140);
orbit.update();

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const cubeTexture = new THREE.CubeTextureLoader();
scene.background = cubeTexture.load([
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture
]);

const textureLoader = new THREE.TextureLoader();

// crate Solar System
const sunGeo = new THREE.SphereGeometry(32, 30, 30)
const sunMat = new THREE.MeshBasicMaterial({
  map: textureLoader.load(sunTexture)
});
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

const mercuryGeo = new THREE.SphereGeometry(3.2, 30, 30)
const mercuryMat = new THREE.MeshStandardMaterial({
  map: textureLoader.load(mercuryTexture)
});
const mercury = new THREE.Mesh(mercuryGeo, mercuryMat);
const mercuruObj = new THREE.Object3D();
mercuruObj.add(mercury)
scene.add(mercuruObj)
mercury.position.x = 60

const saturnGeo = new THREE.SphereGeometry(8, 30, 30)
const saturnMat = new THREE.MeshStandardMaterial({
  map: textureLoader.load(saturnTexture)
});
const saturn = new THREE.Mesh(saturnGeo, saturnMat);
const saturnObj = new THREE.Object3D();
saturnObj.add(saturn)
scene.add(saturnObj)
saturn.position.x = 200

const pointLight = new THREE.PointLight(0x333333, 10, 300)
scene.add(pointLight)

// end create

function animate() {
  sun.rotateY(0.0005)
  mercuruObj.rotateY(0.03)
  saturnObj.rotateY(0.003)
  mercury.rotateY(0.03)
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
  camera.aspect = this.window.innerWidth / this.window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(this.window.innerWidth, this.window.innerHeight)
})