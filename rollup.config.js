import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import copy from 'rollup-plugin-copy';
import json from 'rollup-plugin-json';
import handlebars from 'rollup-plugin-handlebars';

export default {
    input: 'src/main.js',
    output: {
        file: 'dist/app/data-valve.js',
        format: 'cjs',
        name: 'DataValve'
    },
    external: [
        'fs', 'os', 'stream', 'readline',
        'assert', 'events', 'tty',
        'path', 'crypto'
    ],
    plugins: [
        handlebars(),
        json(),
        commonjs(),
        resolve({
            jsnext: true,
            main: true
        }),
        babel({
            exclude: 'node_modules/**'
        }),
        copy({
            'src/templates': 'dist/app/templates',
            'node_modules/figlet/fonts': 'dist/fonts',
            verbose: true
        }),
    ]
}