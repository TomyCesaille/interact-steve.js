# interact-steve.js

Various interactive components that we often miss (or not) in the greatest frameworks.  
It's built on top of Three.js. Mainly a proof of concept about integrating animated 3D WebGL stuff as html5 components.

## Demo

[interact-steve.js website](https://tomycesaille.github.io/interact-steve.js/index.html)

## Install

```html
<script src="js/three.js"></script>
<script src="js/interact-steve.js"></script>
```

## Usage

```javascript
var canvas1 = document.getElementById("canvas1");
var state1 = document.getElementById("state1");

var clickCallback1 = function (canvas, state) {
  console.log(`state is ${state}`, canvas);
  state1.textContent = state;
};

var steve = new interactsteve.multiToggleButton({
  canvas: canvas1,
  xSize: 50,
  ySize: 50,
  states: ["Online", "Offline"],
  colors: ["#007bff", "#6c757d"],
  defaultColor: theme.light,
  clickCallback: clickCallback1,
});
```

## Dev

```bash
http-server . -p 8000 # to host website for browser
npm run build # to build interact-steve.js
```

## TODO

- Host the demo website.
