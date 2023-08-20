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
import moonTexture from './img/moon.jpg'

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
);

import {OBJLoader} from 'three/addons/loaders/OBJLoader.js';

{
  const objLoader = new OBJLoader();
  objLoader.load('/bicycle.obj', (root) => {
    scene.add(root);
  });
}

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
const sunGeo = new THREE.SphereGeometry(16, 30, 30)
const sunMat = new THREE.MeshBasicMaterial({
  map: textureLoader.load(sunTexture)
});
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

function createPlanet(size, texture, position, ring, satellite) {
  const geo = new THREE.SphereGeometry(size, 30, 30)
  const mat = new THREE.MeshStandardMaterial({
    map: textureLoader.load(texture)
  });
  const mesh = new THREE.Mesh(geo, mat);
  const Obj = new THREE.Object3D();
  Obj.add(mesh)
  if (ring) {
    const ringGeo = new THREE.RingGeometry(ring.innerRadius, ring.outerRadius, 32)
    const ringMat = new THREE.MeshStandardMaterial({
      map: textureLoader.load(ring.texture),
      sode: THREE.DoubleSide
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    Obj.add(ringMesh)
    ringMesh.position.x = position
    ringMesh.rotation.x = -0.5 * Math.PI;
  }
  if (satellite) {
    const satelGeo = new THREE.SphereGeometry(satellite.size, 30, 30)
    const satelMat = new THREE.MeshStandardMaterial({
      map: textureLoader.load(satellite.texture)
    })
    const satel = new THREE.Mesh(satelGeo, satelMat)
    satellite.mesh = satel
    mesh.add(satel)
    satel.position.x = 15
  }
  scene.add(Obj)
  mesh.position.x = position  
  return {mesh, Obj, satellite}
}

const mercury = createPlanet(3.2, mercuryTexture, 28)
const venus = createPlanet(5.8, venusTexture, 44)
const earth = createPlanet(6, earthTexture, 62, undefined, {
  size: 2,
  texture: moonTexture,
  rotationSpeed: 0.04 
})
const mars = createPlanet(4, marsTexture, 78)
const jupiter = createPlanet(12, jupiterTexture, 100)
const saturn = createPlanet(10, saturnTexture, 132, {
  innerRadius: 10,
  outerRadius: 20,
  texture: saturnRingTexture
})
const uranus = createPlanet(7, uranusTexture, 176, {
  innerRadius: 7,
  outerRadius: 12,
  texture: uranusRingTexture
})
const neptune = createPlanet(7, neptuneTexture, 200)
const pluto = createPlanet(2.8, plutoTexture, 216)

const pointLight = new THREE.PointLight(0x333333, 10, 300)
scene.add(pointLight)

// end create

function animate() {
  sun.rotateY(0.0005)
  mercury.Obj.rotateY(0.04)
  venus.Obj.rotateY(0.015)
  earth.Obj.rotateY(0.01)
  earth.satellite.mesh.rotation.y += 0.2
  mars.Obj.rotateY(0.008)
  jupiter.Obj.rotateY(0.003)
  saturn.Obj.rotateY(0.0015)
  uranus.Obj.rotateY(0.0004)
  neptune.Obj.rotateY(0.0001)
  pluto.Obj.rotateY(0.00007)

  mercury.mesh.rotateY(0.004)
  venus.mesh.rotateY(0.002)
  earth.mesh.rotateY(0.02)
  mars.mesh.rotateY(0.018)
  jupiter.mesh.rotateY(0.04)
  saturn.mesh.rotateY(0.003)
  uranus.mesh.rotateY(0.03)
  neptune.mesh.rotateY(0.032)
  pluto.mesh.rotateY(0.008)

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
  camera.aspect = this.window.innerWidth / this.window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(this.window.innerWidth, this.window.innerHeight)
})