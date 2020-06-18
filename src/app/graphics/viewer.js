import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  MeshBasicMaterial,
  Mesh,
  SphereGeometry,
  TextureLoader,
} from 'three';

const self = {
  animationId: null,
};

export const startViewer = (element, body) => {
  if (!element) return; // Extra safety; yet should not be necessary...
  if (self.animationId) return; // Already running

  const rect = element.getBoundingClientRect();

  const scene = new Scene();
  const camera = new PerspectiveCamera(75, rect.width / rect.height, 0.1, 1000);
  const renderer = new WebGLRenderer()
  renderer.setSize(rect.width, rect.height);
  element.appendChild(renderer.domElement);

  const mesh = new Mesh(
    new SphereGeometry(1, 64, 64),
    new MeshBasicMaterial({
      map: new TextureLoader().load(`textures/${body.texture}.jpg`),
    }),
  );
  scene.add(mesh);

  camera.position.x = 1.5;
  camera.position.y = 1.5;
  camera.position.z = 1.5;
  camera.lookAt(0, 0, 0);
  camera.updateProjectionMatrix();

  const main = () => {
    renderer.render(scene, camera);

    mesh.rotation.y += 0.005;

    self.animationId = requestAnimationFrame(main);
  };
  main();
};

export const stopViewer = () => {
  cancelAnimationFrame(self.animationId);
  self.animationId = null;
};
