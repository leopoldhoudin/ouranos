import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  MeshBasicMaterial,
  Mesh,
  SphereGeometry,
  TextureLoader,
  AxesHelper,
} from 'THREE';
import { OrbitControls } from 'THREE/examples/jsm/controls/OrbitControls';

import state from 'state';
import engine from 'engine';
import { dampen } from 'utils';

const self = {
  scene: null,
  camera: null,
  renderer: null,
  meshes: new Array(),
};

const init = element => {
  self.scene = new Scene();
  self.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  self.renderer = new WebGLRenderer();
  self.renderer.setSize(window.innerWidth, window.innerHeight);
  element.appendChild(self.renderer.domElement);

  self.controls = new OrbitControls(self.camera, document.getElementById('root'));

  window.addEventListener('resize', handleWindowResize, false);
};

const start = () => {
  const bodies = state.get('bodies');

  self.meshes.forEach(body => self.scene.remove(body));
  self.meshes.splice(0, self.meshes.length);

  bodies.forEach(body => {
    const mesh = new Mesh(
      new SphereGeometry(body.radius, 32, 32),
      new MeshBasicMaterial({
        map: new TextureLoader().load(`textures/${body.texture}.jpg`),
      }),
    );

    updateMesh(mesh, body.initialConditions);

    self.meshes.push(mesh);
    self.scene.add(mesh);
  });

  const axes = new AxesHelper(50);
  self.scene.add(axes);

  self.camera.position.x = 50;
  self.camera.position.y = 200;
  self.camera.position.z = 100;
  self.camera.lookAt(0, 0, 0);
  self.camera.updateProjectionMatrix();

  main();
};

let lastLoopTimestamp = null;
let currSimuTimestamp = 1577836800;
const main = loopTimestamp => {
  if (lastLoopTimestamp == null) {
    lastLoopTimestamp = loopTimestamp;
  }
  const elapsed = (loopTimestamp && lastLoopTimestamp)
    ? (loopTimestamp - lastLoopTimestamp) / 1000
    : 0;
  const currFrame = engine.getFrameAt(currSimuTimestamp);

  self.controls.update();
  self.renderer.render(self.scene, self.camera);

  if (currFrame) {
    const simulation = state.get('simulation');
    const bodies = state.get('bodies');

    currSimuTimestamp += (Math.pow(10, simulation.speed) * elapsed * 60);
    lastLoopTimestamp = loopTimestamp;

    dampen(
      'graphics:main',
      100,
      () => state.set('simulation', 'timestamp', currSimuTimestamp)
    );

    currFrame.bodies.forEach(
      (body, index) => updateMesh(self.meshes[index], body)
    );
  }

  requestAnimationFrame(main);
};

const updateMesh = (body, values) => {
  body.position.x = values.position.x;
  body.position.y = values.position.y;
  body.position.z = values.position.z;
  body.rotation.x = values.rotation.x;
  body.rotation.y = values.rotation.y;
  body.rotation.z = values.rotation.z;
};

const handleWindowResize = () => {
  self.camera.aspect = window.innerWidth / window.innerHeight;
  self.camera.updateProjectionMatrix();
  self.renderer.setSize(window.innerWidth, window.innerHeight);
};

export { startViewer, stopViewer } from './viewer';

export default {
  init,
  start,
};;
