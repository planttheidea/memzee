import typescript from "rollup-plugin-typescript";
import { uglify } from "rollup-plugin-uglify";

export default [
  {
    input: "src/index.ts",
    output: {
      exports: "named",
      name: "memzee",
      file: "dist/memzee.js",
      format: "umd",
      sourcemap: true
    },
    plugins: [typescript()]
  },
  {
    input: "src/index.ts",
    output: {
      exports: "named",
      name: "memzee",
      file: "dist/memzee.min.js",
      format: "umd"
    },
    plugins: [typescript(), uglify()]
  }
];
