import { VimWasm, checkBrowserCompatibility } from 'vim-wasm';
import solarized from './solarized.vim?raw';

const error = checkBrowserCompatibility();
if (error !== undefined) {
  alert(error);
} else {
  const canvas = document.querySelector<HTMLCanvasElement>('#vim-canvas');
  const input = document.querySelector<HTMLInputElement>('#vim-input');
  if (!canvas || !input) throw new Error('Vim canvas/input elements not found');

  // Same rule as the site: exactly one Solarized variant, picked by the device.
  const background = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

  new VimWasm({ canvas, input, workerScriptPath: '/vim-wasm/vim.js' }).start({
    files: { '/solarized.vim': solarized },
    cmdArgs: ['-c', `set background=${background} | source /solarized.vim`],
  });
}
