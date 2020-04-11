import * as THREE from 'three';

export class multiToggleButton {
    constructor(settings) {
        const canvas = settings.canvas;
        const xSize = settings.xSize || 200;
        const ySize = settings.ySize || 200;

        const animationSpeed = settings.animationSpeed || 0.01;

        const states = settings.states || ["On", "Off"];
        const colors = settings.colors || [];
        const defaultColor = settings.defaultColor || '#a9a9a9';

        const clickCallback = settings.clickCallback;

        while (colors.length < 6) {
            colors.push(defaultColor);
        }

        let stateIndex = 0;
        let state = states[0];

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, xSize / ySize, 0.1, 1000);
        camera.position.z = 1.5;

        const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
        renderer.setClearColor(0x000000, 0);
        renderer.setSize(xSize, ySize);

        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const materials = colors.map(x => new THREE.MeshStandardMaterial({ color: x }))

        const cube = new THREE.Mesh(geometry, materials);
        scene.add(cube);

        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        scene.add(light);

        let eulerVector = new THREE.Vector3(0, 0, 0);
        let t = 0;

        var rotate = function () {
            if (stateIndex == 0) {
                eulerVector = new THREE.Vector3(0, THREE.Math.degToRad(270), 0);
            }
            if (stateIndex == 1) {
                eulerVector = new THREE.Vector3(0, THREE.Math.degToRad(90), 0);
            }
            if (stateIndex == 2) {
                eulerVector = new THREE.Vector3(THREE.Math.degToRad(90), 0, 0);
            }
            if (stateIndex == 3) {
                eulerVector = new THREE.Vector3(THREE.Math.degToRad(270), 0, 0);
            }
            if (stateIndex == 4) {
                eulerVector = new THREE.Vector3(0, THREE.Math.degToRad(0), 0);
            }
            if (stateIndex == 5) {
                eulerVector = new THREE.Vector3(0, THREE.Math.degToRad(180), 0);
            }
            t = 0;
        };
        rotate();

        var animate = function () {
            requestAnimationFrame(animate);

            if (t < 1) {
                t += animationSpeed;
            }

            cube.rotation.x = THREE.MathUtils.lerp(cube.rotation.x, eulerVector.x, t);
            cube.rotation.y = THREE.MathUtils.lerp(cube.rotation.y, eulerVector.y, t);
            cube.rotation.z = THREE.MathUtils.lerp(cube.rotation.z, eulerVector.z, t);
            renderer.render(scene, camera);
        };
        animate();

        var onCanvasClick = function () {
            stateIndex = (stateIndex >= states.length - 1) ? 0 : stateIndex + 1;
            state = states[stateIndex];

            rotate();

            if (clickCallback)
                clickCallback(canvas, state);
        };
        if (clickCallback)
            clickCallback(canvas, state);

        canvas.addEventListener('click', function () { onCanvasClick(); }, false);
    }
}
