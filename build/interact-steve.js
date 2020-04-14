(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three')) :
    typeof define === 'function' && define.amd ? define(['exports', 'three'], factory) :
    (global = global || self, factory(global.interactsteve = {}, global.THREE));
}(this, (function (exports, THREE) { 'use strict';

    class multiToggleButton {
        constructor(settings) {
            this.canvas = settings.canvas;
            this.xSize = settings.xSize || 200;
            this.ySize = settings.ySize || 200;

            this.animationSpeed = settings.animationSpeed || 0.01;

            this.geometry = settings.geometry || "Box";
            this.states = settings.states || ["On", "Off"];
            this.colors = settings.colors || [];
            this.defaultColor = settings.defaultColor || '#a9a9a9';

            this.clickCallback = settings.clickCallback;

            while (this.colors.length < 6) {
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

            this.mesh = this.generateMesh();
            this.scene.add(this.mesh);

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
            this.t = 0;

            if (this.geometry.toLowerCase() == "box") {
                this.eulerVector = new THREE.Vector3(
                    THREE.Math.degToRad(this.boxRotations[this.stateIndex][0]),
                    THREE.Math.degToRad(this.boxRotations[this.stateIndex][1]),
                    THREE.Math.degToRad(this.boxRotations[this.stateIndex][2]));
            }
            else if (this.geometry.toLowerCase() == "tetrahedron") {
                this.eulerVector = new THREE.Vector3(
                    THREE.Math.degToRad(this.tetrahedronRotations[this.stateIndex][0]),
                    THREE.Math.degToRad(this.tetrahedronRotations[this.stateIndex][1]),
                    THREE.Math.degToRad(this.tetrahedronRotations[this.stateIndex][2]));
            }
            else if (this.geometry.toLowerCase() == "icosahedron") {
                this.eulerVector = new THREE.Vector3(
                    THREE.Math.degToRad(this.icosahedronRotations[this.stateIndex][0]),
                    THREE.Math.degToRad(this.icosahedronRotations[this.stateIndex][1]),
                    THREE.Math.degToRad(this.icosahedronRotations[this.stateIndex][2]));
            }
        }

        animate() {
            requestAnimationFrame(() => this.animate());

            if (this.t < 1) {
                this.t += this.animationSpeed;
            }

            this.mesh.rotation.x = THREE.MathUtils.lerp(this.mesh.rotation.x, this.eulerVector.x, this.t);
            this.mesh.rotation.y = THREE.MathUtils.lerp(this.mesh.rotation.y, this.eulerVector.y, this.t);
            this.mesh.rotation.z = THREE.MathUtils.lerp(this.mesh.rotation.z, this.eulerVector.z, this.t);

            this.renderer.render(this.scene, this.camera);
        }

        generateMesh() {
            let baseMaterial = new THREE.MeshStandardMaterial({
                side: THREE.FrontSide,
                flatShading: THREE.FlatShading,
                vertexColors: THREE.VertexColors
            });

            if (this.geometry.toLowerCase() == "box") {
                let geometry = new THREE.BoxGeometry(1, 1, 1);
                let materials = this.colors.map(x => new THREE.MeshStandardMaterial({
                    color: x,
                    side: baseMaterial.side,
                    flatShading: baseMaterial.flatShading,
                    vertexColors: baseMaterial.vertexColors
                }));
                return new THREE.Mesh(geometry, materials);
            }
            else if (this.geometry.toLowerCase() == "tetrahedron") {
                let geometry = new THREE.TetrahedronGeometry(0.95, 0);
                for (let i = 0; i < geometry.faces.length; i++) {
                    geometry.faces[i].color = new THREE.Color(this.colors[i]);
                }
                return new THREE.Mesh(geometry, baseMaterial);
            }
            else if (this.geometry.toLowerCase() == "icosahedron") {
                let geometry = new THREE.IcosahedronGeometry(0.95, 0);
                for (let i = 0; i < geometry.faces.length; i++) {
                    geometry.faces[i].color = new THREE.Color(this.colors[i]);
                }
                return new THREE.Mesh(geometry, baseMaterial);
            }
        }

        get boxRotations() {
            return [
                [0, 270, 0],
                [0, 90, 0],
                [90, 0, 0],
                [270, 0, 0],
                [0, 0, 0],
                [0, 180, 0],
            ];
        }

        get tetrahedronRotations() {
            return [
                [35, 45, 0],
                [-125, 0, -135],
                [45, -40, 100],
                [125, 15, -145],
            ];
        }

        get icosahedronRotations() {
            return [
                [35, 45, 0], // [0]
                [70, 0, 0], // [1]
                [70, 180, 0], // [2]
                [35, 135, 0], // [3]
                [20, 90, 0], // [4]
                [35, 315, 0], // [5]
                [0, 20, 0], // [6]
                [-20, 90, 0], // [7]
                [0, 160, 0], // [8]
                [35, 225, 0], // [9]
                [-35, 315, 0], // [10]
                [-70, 0, 0], // [11]
                [-70, 180, 0], // [12]
                [-35, 225, 0], // [13]
                [-20, 270, 0], // [14]
                [0, 340, 0], // [15]
                [-35, 45, 0], // [16]
                [-35, 135, 0], // [17]
                [0, 200, 0], // [18]
                [20, 270, 0], // [19]
            ];
        }
    }

    exports.multiToggleButton = multiToggleButton;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
