# interact-steve.js

Various interactive components that we often miss (or not) in the greatest frameworks.  
It's built on top of Three.js. Mainly a proof of concept about integrating animated 3D WebGL stuff as html5 components.

## Demo

[interact-steve.js website](https://tomycesaille.github.io/interact-steve.js/index.html)

![gif](https://i.imgur.com/fdrgJyd.gif)

## Install

```html
<script src="js/three.js"></script>
<script src="js/interact-steve.js"></script>
```

## Usage

### Multi-state button

Toggle button that supports more than 2 state.

Geometry available:

- Box (6 faces)
- Tetrahedron (4 faces)
- Icosahedron (20 faces)

```javascript
var canvas1 = document.getElementById("canvas1");
var state1 = document.getElementById("state1");

var clickCallback1 = function (canvas, state) {
  console.log(`state is ${state}`, canvas);
  state1.textContent = state;
};

var multiToggleButton1 = new interactsteve.multiToggleButton({
  canvas: canvas1,
  xSize: 50,
  ySize: 50,
  animationSpeed: 0.01,
  geometry: "Box",
  states: ["Online", "Offline"],
  colors: ["#007bff", "#6c757d"],
  defaultColor: theme.light,
  clickCallback: clickCallback1,
});

multiToggleButton1.click(); // To click using javascript.
multiToggleButton1.setState("Offline"); // To set state using javascript.
```

## Dev

```bash
http-server . -p 8000 # to host website for browser

npm run build # to build interact-steve.js oneshot
rollup -c -w # to build interact-steve.js live
```

## TODO

- [x] Host the demo website
- [ ] Add animation types with multi-toggle-button component (not only linear)
- [ ] Support more meshes with multi-toggle-button component (not only square box)
  - [x] Tetrahedron
  - [ ] Cylinder
  - [ ] Dodecahedron
  - [x] Icosahedron <3
  - [ ] Octahedron
- [ ] More components !
- [ ] User feedback (mouse hover, mouse click animation...)
- [ ] Other styling customization (texturing, shader...)
- [ ] Improve support of not-squared size
- [x] Eat more vegetables
