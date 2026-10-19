import { VimWasm, checkBrowserCompatibility } from 'vim-wasm';

const error = checkBrowserCompatibility();
if (error !== undefined) {
  alert(error);
} else {
  const canvas = document.querySelector<HTMLCanvasElement>('#vim-canvas');
  const input = document.querySelector<HTMLInputElement>('#vim-input');
  if (!canvas || !input) throw new Error('Vim canvas/input elements not found');

  new VimWasm({ canvas, input, workerScriptPath: '/vim-wasm/vim.js' }).start();
}
