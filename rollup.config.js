import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import pkg from './package.json';
import { terser, } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript';


export default [
  // browser-friendly UMD build
  {
    input: 'dist/index.js',
    output: {
      exports: 'named',
      file: pkg.browser,
      name: 'els',
      format: 'umd',
    },
    plugins: [
      typescript(),
      resolve({
        preferBuiltins: true,
      }), // so Rollup can find `ms`
      commonjs({
        namedExports: {
          // left-hand side can be an absolute path, a path
          // relative to the current directory, or the name
          // of a module in node_modules
        },
      }), // so Rollup can convert `ms` to an ES module
      builtins({
      }),
      globals({
      }),
      terser({
        // screwIE8 : true,
        // sourceMap: false
      }),
    ],
  },
  // browser-friendly IIFE
  {
    input: 'dist/index.js',
    output: {
      exports: 'named',
      file: pkg.web,
      name: 'els',
      format: 'iife',
    },
    plugins: [
      typescript(),
      resolve({
        preferBuiltins: true,
      }), // so Rollup can find `ms`
      commonjs({
        namedExports: {
          // left-hand side can be an absolute path, a path
          // relative to the current directory, or the name
          // of a module in node_modules
          // 'node_modules/routes/dist/routes.js': [ 'Routes', ],
        },
      }), // so Rollup can convert `ms` to an ES module
      builtins({
      }),
      globals({
      }),
      terser({
        // screwIE8 : true,
        // sourceMap: false
      }),
    ],
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify 
  // `file` and `format` for each target)
  {
    input: 'dist/index.js',
    external: [
      // '@tensorflow/tfjs',
      // 'lodash.range',
      'routes/index'
    ],
    output: [
      {
        exports: 'named',
        file: pkg.node,
        name: 'els',
        format: 'cjs',
      },
      {
        exports: 'named',
        file: pkg.es,
        name: 'els',
        format: 'es',
      },
    ],
    // plugins: [
    //   typescript()
    // ]
  },
];
