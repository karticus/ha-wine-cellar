import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import serve from "rollup-plugin-serve";

const isProd = process.env.NODE_ENV === "production";
const isDev = process.env.ROLLUP_WATCH;

export default {
  input: "src/wine-cellar-card.ts",
  output: {
    file: "../custom_components/wine_cellar/frontend/wine-cellar-card.js",
    format: "es",
    sourcemap: !isProd,
  },
  plugins: [
    resolve(),
    typescript(),
    isProd && terser(),
    isDev &&
      serve({
        contentBase: "../custom_components/wine_cellar/frontend",
        port: 5050,
      }),
  ].filter(Boolean),
};
