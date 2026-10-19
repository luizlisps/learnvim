import { defineConfig } from 'astro/config';
import type { AstroIntegration } from 'astro';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// vim.wasm needs SharedArrayBuffer => cross-origin isolation.
// The production host must send these same headers.
const isolation = {
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Embedder-Policy': 'require-corp',
};

// Astro-rendered pages bypass vite's `server.headers`, so set them in middleware.
const crossOriginIsolation: AstroIntegration = {
  name: 'cross-origin-isolation',
  hooks: {
    'astro:server:setup': ({ server }) => {
      server.middlewares.use((_req, res, next) => {
        for (const [name, value] of Object.entries(isolation)) res.setHeader(name, value);
        next();
      });
    },
  },
};

export default defineConfig({
  integrations: [crossOriginIsolation],
  vite: {
    preview: { headers: isolation },
    plugins: [
      // The worker (vim.js) loads vim.wasm/vim.data by relative name,
      // so all three must be served side by side, unhashed.
      viteStaticCopy({
        targets: [{ src: 'node_modules/vim-wasm/vim.{js,wasm,data}', dest: 'vim-wasm', rename: { stripBase: true } }],
      }),
    ],
  },
});
