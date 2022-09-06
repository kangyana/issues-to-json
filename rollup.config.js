const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const json = require('@rollup/plugin-json');

module.exports = {
  input: 'lib/es/index.js',
  output: {
    name: 'issues-to-json',
    file: 'lib/umd/issues-to-json.js',
    format: 'umd',
  },
  plugins: [nodeResolve(), commonjs(), json()],
};
