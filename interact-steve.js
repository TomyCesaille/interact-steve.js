const canvas = document.getElementById('canvas1');

const xSize = 200;
const ySize = 200;
const animationSpeed = 0.08;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, xSize / ySize, 0.1, 1000);
camera.position.z = 1.5;

const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
renderer.setClearColor(0x000000, 0);
renderer.setSize(xSize, ySize);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material1 = new THREE.MeshStandardMaterial({ color: '#0069d9' });
const material2 = new THREE.MeshStandardMaterial({ color: '#5a6268' });
const cube = new THREE.Mesh(geometry, [material1, material1, material1, material2, material2, material2]);
scene.add(cube);

const color = 0xFFFFFF;
const intensity = 1;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1, 2, 4);
scene.add(light);

let eulerVector = new THREE.Vector3(0, 0, 0);
let t = 1;

var rotateY = function () {
    eulerVector.y += THREE.Math.degToRad(90);
    t = 0;
};

var animate = function () {
    requestAnimationFrame(animate);

    if (t < 1) {
        t += animationSpeed;
    }

    cube.rotation.y = THREE.MathUtils.lerp(cube.rotation.y, eulerVector.y, t);
    renderer.render(scene, camera);
};
animate();

var onCanvasClick = function () {
    rotateY();
};
canvas.addEventListener('click', function () { onCanvasClick(); }, false);
