import { terser } from 'rollup-plugin-terser';
import { version } from './package.json';

let globals = {
    'three': 'THREE',
};

const banner = `/*!
 * interact-steve.js v${version}
 * https://tomycesaille.github.io/interact-steve.js/index.html
 * (c) 2020 interact-steve.js Joris La Cancellera (https://jorislacance.fr)
 * Released under the MIT License
 */`;

export default [{
    external: Object.keys(globals),
    input: 'src/index.js',
    context: 'window',
    output: {
        file: 'build/interact-steve.js',
        format: 'umd',
        banner: banner,
        name: 'interactsteve',
        globals,
    }
},
{
    external: Object.keys(globals),
    input: 'src/index.js',
    context: 'window',
    plugins: [
        terser(),
    ],
    output: {
        file: 'build/interact-steve.min.js',
        format: 'umd',
        banner: banner,
        name: 'interactsteve',
        globals,
    },
}];