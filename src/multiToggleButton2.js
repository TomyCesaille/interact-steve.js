import * as THREE from 'three';

export class multiToggleButton2 {
    constructor(settings) {
        this.canvas = settings.canvas;
        this.xSize = settings.xSize || 200;
        this.ySize = settings.ySize || 200;

        this.animationSpeed = settings.animationSpeed || 0.01;

        this.states = settings.states || ["On", "Off"];
        this.colors = settings.colors || [];
        this.defaultColor = settings.defaultColor || '#a9a9a9';

        this.clickCallback = settings.clickCallback;

        while (this.colors.length < 4) {
            this.colors.push(this.defaultColor);
        }

        this.stateIndex = 0;
        this.state = this.states[0];

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, this.xSize / this.ySize, 0.1, 1000);
        this.camera.position.z = 1.5;

        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, alpha: true });
        this.renderer.setClearColor(0x000000, 0);
        this.renderer.setSize(this.xSize, this.ySize);

        const geometry = new THREE.TetrahedronGeometry(1, 0);
        for (var i = 0; i < geometry.faces.length; i++) {
            geometry.faces[i].color = new THREE.Color(this.colors[i]);
        }
        var material = new THREE.MeshStandardMaterial({
            side: THREE.FrontSide,
            shading: THREE.FlatShading,
            vertexColors: THREE.VertexColors
        });

        this.cube = new THREE.Mesh(geometry, material);
        this.scene.add(this.cube);

        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        this.scene.add(light);

        this.eulerVector = new THREE.Vector3(0, 0, 0);
        this.t = 0;

        this.rotate();

        this.animate();
        this.tt = this.animate();

        if (this.clickCallback)
            this.clickCallback(this.canvas, this.state);

        this.canvas.addEventListener('click', () => this.onCanvasClick(), false);
    }

    // public API to click using javascript.
    click() {
        this.onCanvasClick();
    }

    // public API to set a state using javascript.
    setState(state) {
        let stateIndex = this.states.findIndex(x => x == state);
        this.stateIndex = stateIndex;
        this.state = this.states[this.stateIndex];

        this.rotate();

        if (this.clickCallback)
            this.clickCallback(this.canvas, this.state);
    }

    onCanvasClick() {
        this.stateIndex = (this.stateIndex >= this.states.length - 1) ? 0 : this.stateIndex + 1;
        this.state = this.states[this.stateIndex];

        this.rotate();

        if (this.clickCallback)
            this.clickCallback(this.canvas, this.state);
    }

    rotate() {
        if (this.stateIndex == 0) {
            this.eulerVector = new THREE.Vector3(THREE.Math.degToRad(35), THREE.Math.degToRad(45), THREE.Math.degToRad(0));
        }
        if (this.stateIndex == 1) {
            this.eulerVector = new THREE.Vector3(THREE.Math.degToRad(-125), THREE.Math.degToRad(0), THREE.Math.degToRad(-135));
        }
        if (this.stateIndex == 2) {
            this.eulerVector = new THREE.Vector3(THREE.Math.degToRad(45), THREE.Math.degToRad(-40), THREE.Math.degToRad(100));
        }
        if (this.stateIndex == 3) {
            this.eulerVector = new THREE.Vector3(THREE.Math.degToRad(125), THREE.Math.degToRad(15), THREE.Math.degToRad(-145));
        }
        this.t = 0;
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        if (this.t < 1) {
            this.t += this.animationSpeed;
        }

        this.cube.rotation.x = THREE.MathUtils.lerp(this.cube.rotation.x, this.eulerVector.x, this.t);
        this.cube.rotation.y = THREE.MathUtils.lerp(this.cube.rotation.y, this.eulerVector.y, this.t);
        this.cube.rotation.z = THREE.MathUtils.lerp(this.cube.rotation.z, this.eulerVector.z, this.t);
        this.renderer.render(this.scene, this.camera);
    }
}
