import * as THREE from 'three';
import './style.css';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui'

import nebula from './img/nebula.jpg'
import stars from './img/stars.jpg'


const renderer = new THREE.WebGLRenderer();

renderer.shadowMap.enabled = true

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45, 
  window.innerWidth / window.innerHeight,
  0.1,
  100
);

const orbit = new OrbitControls(camera, renderer.domElement)

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

camera.position.set(-10, 30, 30)
orbit.update()

const planeGeometry = new THREE.PlaneGeometry(30, 30)
const planeMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide
})
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
scene.add(plane)
plane.rotation.x = -0.5 * Math.PI
plane.receiveShadow = true

const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper)

const sphereGeometry = new THREE.SphereGeometry(2, 30, 30);
const sphereMaterial = new THREE.MeshStandardMaterial({
  color: 0x00fff00,
  wireframe: false,
})
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
scene.add(sphere)
sphere.castShadow = true
sphere.position.set(-10, 10, 0)

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
scene.add(directionalLight)
directionalLight.position.set(-30, 50, 0)
directionalLight.castShadow = true
directionalLight.shadow.camera.bottom = -12 

const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5)
scene.add(dLightHelper)

const dLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
scene.add(dLightShadowHelper)

const texture = new THREE.TextureLoader();
// scene.background = texture.load(stars)
const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
  nebula,
  nebula,
  stars,
  stars,
  stars,
  stars,
])

const box2Geometry = new THREE.BoxGeometry(4, 4, 4)
const box2MAterial = new THREE.MeshBasicMaterial({
  map: texture.load(stars)
})
const box2 = new THREE.Mesh(box2Geometry, box2MAterial)
scene.add(box2)
box2.position.set(0, 5, 10)

const gui = new dat.GUI();

const options = {
  sphereColor: '#ffea00',
  wireframe: false,
  speed: 0.01
}

gui.addColor(options, 'sphereColor').onChange(function(e){
  sphere.material.color.set(e)
})

gui.add(options, 'wireframe').onChange(function(e){
  sphere.material.wireframe = e
})

gui.add(options, 'speed', 0, 0.1);

const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({
  color: 0x444444
});
const box = new THREE.Mesh(boxGeometry, boxMaterial)
scene.add(box)

let step = 0

function animate() {
  box.rotation.x += 0.01
  box.rotation.y += 0.01

  step += options.speed
  sphere.position.y = 10 * Math.abs(Math.sin(step))

  renderer.render(scene, camera)
}

renderer.setAnimationLoop(animate)


window.addEventListener('resize', function() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight)
})