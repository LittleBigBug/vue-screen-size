// rollup.config.js
// https://vuejs.org/v2/cookbook/packaging-sfc-for-npm.html
import vue from 'rollup-plugin-vue';
// import css from 'rollup-plugin-css-only'
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import minimist from 'minimist';

const argv = minimist(process.argv.slice(2));

const config = {
    input: 'src/index.ts',
    output: {
        name: 'VueScreenSize',
        exports: 'named',
        globals: {
            'vue': 'Vue'
        }
    },
    plugins: [
        resolve({
            jsnext: true,
            main: true,
            browser: true,
            extensions: [ '.mjs', '.js', '.json', '.node', '.ts', '.tsx' ]
        }),
        vue({
            css: false,
            compileTemplate: true,
        }),
        // css({ output: 'dist/vue-screen-size.css' }),
        babel({
            extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.ts', '.tsx'],
            babelHelpers: 'bundled',
        }),
    ],
    external: ['vue']
};

// Only minify browser (iife) version
if (argv.format === 'iife') {
    config.plugins.push(terser());

    // Here we remove our `external` dependency that we have in this project
    // Be careful with the index here - it has to match any dependency that
    // you want to be built into to the iife output
    // config.external.splice(1)
}

export default config;
