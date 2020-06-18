import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  MeshBasicMaterial,
  Mesh,
  SphereGeometry,
  TextureLoader,
  AxesHelper,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import state from 'state';
import engine from 'engine';
import { dampen } from 'utils';
import { colorNameToColor } from 'theme';

const self = {
  animationId: null,
  lastLoopTimestamp: null,
  currSimuTimestamp: null,

  scene: null,
  camera: null,
  renderer: null,

  axes: null,
  meshes: new Array(),
};

const init = element => {
  self.scene = new Scene();
  self.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  self.renderer = new WebGLRenderer();
  self.renderer.setSize(window.innerWidth, window.innerHeight);
  element.appendChild(self.renderer.domElement);

  self.controls = new OrbitControls(self.camera, document.getElementById('root'));

  self.lastLoopTimestamp = null;
  self.currSimuTimestamp = 1577836800;

  window.addEventListener('resize', handleWindowResize, false);
};

const start = () => {
  const options = state.get('graphics');
  const bodies = state.get('bodies');

  self.meshes.forEach(body => self.scene.remove(body));
  self.meshes.splice(0, self.meshes.length);

  bodies.forEach(body => {
    const segmentsCount = options.useTexture ? options.textureSegmentsCount : 16;
    const materialParams = options.useTexture
      ? {map: new TextureLoader().load(`textures/${body.texture}.jpg`)}
      : {color: colorNameToColor(body.color), wireframe: true};

    const mesh = new Mesh(
      new SphereGeometry(options.scale * body.radius, segmentsCount, segmentsCount),
      new MeshBasicMaterial(materialParams),
    );

    updateMesh(mesh, body.initialConditions);

    self.meshes.push(mesh);
    self.scene.add(mesh);
  });

  if (options.axes) {
    self.axes = new AxesHelper(50);
    self.scene.add(self.axes);
  } else {
    self.axes = null;
  }

  {
    const {x, y, z} = self.camera.position;
    if (x == 0 && y == 0 && z == 0) {
      self.camera.position.x = 50;
      self.camera.position.y = 200;
      self.camera.position.z = 100;
      self.camera.lookAt(0, 0, 0);
    }
  }

  self.camera.updateProjectionMatrix();

  main();
};

const stop = () => {
  cancelAnimationFrame(self.animationId);
  self.animationId = null;

  if (self.axes) {
    self.scene.remove(self.axes);
  }

  self.meshes.forEach(mesh => self.scene.remove(mesh));
};

const restart =() => {
  stop();
  start();
};

const main = loopTimestamp => {
  if (self.lastLoopTimestamp == null) {
    self.lastLoopTimestamp = loopTimestamp;
  }
  const elapsed = (loopTimestamp && self.lastLoopTimestamp)
    ? (loopTimestamp - self.lastLoopTimestamp) / 1000
    : 0;
  const currFrame = engine.getFrameAt(self.currSimuTimestamp);

  self.controls.update();
  self.renderer.render(self.scene, self.camera);

  if (currFrame) {
    const simulation = state.get('simulation');
    const bodies = state.get('bodies');

    self.currSimuTimestamp += simulation.speed != null
     ? (Math.pow(10, simulation.speed) * elapsed * 60)
     : 0;
    self.lastLoopTimestamp = loopTimestamp;

    dampen(
      'graphics:main',
      100,
      () => state.set('simulation', 'timestamp', self.currSimuTimestamp)
    );

    currFrame.bodies.forEach(
      (body, index) => {
        updateMesh(self.meshes[index], body);

        if (simulation.focus == body.uuid) {
          self.camera.lookAt(
            body.position.x,
            body.position.y,
            body.position.z,
          );
          self.camera.updateProjectionMatrix();
        }
      }
    );

  }

  self.animationId = requestAnimationFrame(main);
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
  stop,
  restart,
};;
