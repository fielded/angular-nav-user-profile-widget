import babel from 'rollup-plugin-babel'
import string from 'rollup-plugin-string'
import uglify from 'rollup-plugin-uglify'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'

export default {
  entry: 'src/index.js',
  dest: 'dist/bundle.js',
  external: ['angular'],
  format: 'iife',
  plugins: [
    string({
      include: '**/*.html'
    }),
    babel({
      exclude: ['node_modules/**']
    }),
    uglify(),
    nodeResolve({
      main: true,
      jsnext: true,
      browser: true
    }),
    commonjs()
  ],
  globals: {
    angular: 'angular'
  }
}
