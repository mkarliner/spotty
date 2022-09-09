import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";

import rollupNodePolyFill from "rollup-plugin-node-polyfills";

export default {
  resolve: {
    alias: {
      events: "rollup-plugin-node-polyfills/polyfills/events",
      process: "rollup-plugin-node-polyfills/polyfills/process-es6",
      querystring: "rollup-plugin-node-polyfills/polyfills/qs",
      url: "rollup-plugin-node-polyfills/polyfills/url",
      util: "rollup-plugin-node-polyfills/polyfills/util",
    },
  },

  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },

      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
        }),

        NodeModulesPolyfillPlugin(),
      ],
    },
  },

  build: {
    rollupOptions: {
      plugins: [rollupNodePolyFill()],
    },

    sourcemap: true,
  },
};
