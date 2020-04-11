import { terser } from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';

import { main } from './package.json';

let globals = {
    'three': 'THREE',
};

export default {
    external: Object.keys(globals),
    input: 'src/index.js',
    context: 'window',
    plugins: [
        resolve({
            jsnext: true,
            main: true,
            module: true
        })
        // terser(),
    ],
    output: {
        file: main,
        format: 'umd',
        name: 'interactsteve',
        globals,
    },
};