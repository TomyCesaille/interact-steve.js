var canvas = document.getElementById('canvas1');
var xSize = 200;
var ySize = 200;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, xSize / ySize, 0.1, 1000);
camera.position.z = 1.5;

var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
renderer.setClearColor(0x000000, 0);
renderer.setSize(xSize, ySize);

var geometry = new THREE.BoxGeometry(1, 1, 1);
var material1 = new THREE.MeshStandardMaterial({ color: '#0069d9' });
var material2 = new THREE.MeshStandardMaterial({ color: '#5a6268' });
var cube = new THREE.Mesh(geometry, [material1, material1, material1, material2, material2, material2]);
scene.add(cube);

const color = 0xFFFFFF;
const intensity = 1;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1, 2, 4);
scene.add(light);

let desiredRx = 0;
let desiredRy = 0;

var animate = function () {
    requestAnimationFrame(animate);

    if (cube.rotation.x < desiredRx) {
        cube.rotation.x += 0.05;
    }
    if (cube.rotation.y < desiredRy) {
        cube.rotation.y += 0.05;
    }
    renderer.render(scene, camera);
};
animate();

var onCanvasClick = function (event) {
    console.log(`Canvas ${event.target} click.`);
    desiredRy += THREE.Math.degToRad(90);
};
canvas.addEventListener('click', function (event) { onCanvasClick(event); }, false);