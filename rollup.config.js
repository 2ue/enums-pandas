const { terser } = require('rollup-plugin-terser');
const typescript = require('rollup-plugin-typescript2');
const dts = require('rollup-plugin-dts').default;

module.exports = {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'iife',
      name: 'MyLibrary',
      sourcemap: true,
      plugins: [
        terser({
          format: {
            comments: false,
          },
        }),
      ],
    },
    {
      file: 'dist/umd/index.js',
      format: 'umd',
      name: 'MyLibrary',
      sourcemap: true,
      plugins: [
        terser({
          format: {
            comments: false,
          },
        }),
      ],
    },
    {
      file: 'dist/cjs/index.js',
      format: 'cjs',
      sourcemap: true,
      plugins: [
        terser({
          format: {
            comments: false,
          },
        }),
      ],
    },
    {
      file: 'dist/esm/index.js',
      format: 'es',
      sourcemap: true,
      plugins: [
        terser({
          format: {
            comments: false,
          },
        }),
      ],
    },
  ],
  plugins: [
    typescript({
      tsconfig: 'tsconfig.json', // TypeScript配置文件路径
    }),
    dts(),
  ],
};
