" Solarized (https://ethanschoonover.com/solarized/) for vim.wasm.
" Honors &background: light uses base3/base2/base1/base00/base01,
" dark uses base03/base02/base01/base0/base1. Never mixes the two.

hi clear
if exists('syntax_on') | syntax reset | endif
let g:colors_name = 'solarized'

let s:yellow  = '#b58900'
let s:orange  = '#cb4b16'
let s:red     = '#dc322f'
let s:magenta = '#d33682'
let s:violet  = '#6c71c4'
let s:blue    = '#268bd2'
let s:cyan    = '#2aa198'
let s:green   = '#859900'

if &background ==# 'dark'
  let s:bg = '#002b36' | let s:hl = '#073642' | let s:dim = '#586e75'
  let s:fg = '#839496' | let s:em = '#93a1a1'
else
  let s:bg = '#fdf6e3' | let s:hl = '#eee8d5' | let s:dim = '#93a1a1'
  let s:fg = '#657b83' | let s:em = '#586e75'
endif

function! s:hi(group, fg, bg, attr) abort
  let l:cmd = 'hi ' . a:group . ' guifg=' . a:fg . ' guibg=' . a:bg . ' gui=' . a:attr . ' cterm=' . a:attr
  execute l:cmd
endfunction

call s:hi('Normal',       s:fg,      s:bg,      'NONE')
call s:hi('NonText',      s:dim,     'NONE',    'NONE')
call s:hi('SpecialKey',   s:dim,     'NONE',    'NONE')
" No italic: vim.wasm draws it as an underline.
call s:hi('Comment',      s:dim,     'NONE',    'NONE')
call s:hi('Cursor',       s:bg,      s:fg,      'NONE')
call s:hi('CursorLine',   'NONE',    s:hl,      'NONE')
call s:hi('ColorColumn',  'NONE',    s:hl,      'NONE')
call s:hi('LineNr',       s:dim,     s:bg,      'NONE')
call s:hi('CursorLineNr', s:em,      s:hl,      'NONE')
call s:hi('SignColumn',   s:dim,     s:bg,      'NONE')
call s:hi('Folded',       s:dim,     s:hl,      'NONE')
call s:hi('FoldColumn',   s:dim,     s:bg,      'NONE')
call s:hi('VertSplit',    s:hl,      s:hl,      'NONE')
call s:hi('StatusLine',   s:em,      s:hl,      'NONE')
call s:hi('StatusLineNC', s:dim,     s:hl,      'NONE')
call s:hi('TabLine',      s:dim,     s:hl,      'NONE')
call s:hi('TabLineSel',   s:em,      s:bg,      'NONE')
call s:hi('TabLineFill',  s:dim,     s:hl,      'NONE')
call s:hi('Visual',       'NONE',    s:hl,      'reverse')
call s:hi('Search',       s:bg,      s:yellow,  'NONE')
call s:hi('IncSearch',    s:bg,      s:orange,  'NONE')
call s:hi('MatchParen',   s:bg,      s:dim,     'bold')
call s:hi('Pmenu',        s:fg,      s:hl,      'NONE')
call s:hi('PmenuSel',     s:bg,      s:blue,    'NONE')
call s:hi('WildMenu',     s:bg,      s:blue,    'NONE')
call s:hi('ModeMsg',      s:blue,    'NONE',    'NONE')
call s:hi('MoreMsg',      s:blue,    'NONE',    'NONE')
call s:hi('Question',     s:cyan,    'NONE',    'NONE')
call s:hi('WarningMsg',   s:orange,  'NONE',    'NONE')
call s:hi('ErrorMsg',     s:red,     'NONE',    'bold')
call s:hi('Title',        s:orange,  'NONE',    'bold')
call s:hi('Directory',    s:blue,    'NONE',    'NONE')

call s:hi('Constant',     s:cyan,    'NONE',    'NONE')
call s:hi('String',       s:cyan,    'NONE',    'NONE')
call s:hi('Number',       s:magenta, 'NONE',    'NONE')
call s:hi('Identifier',   s:blue,    'NONE',    'NONE')
call s:hi('Statement',    s:green,   'NONE',    'NONE')
call s:hi('PreProc',      s:orange,  'NONE',    'NONE')
call s:hi('Type',         s:yellow,  'NONE',    'NONE')
call s:hi('Special',      s:red,     'NONE',    'NONE')
call s:hi('Underlined',   s:violet,  'NONE',    'underline')
call s:hi('Todo',         s:magenta, 'NONE',    'bold')
call s:hi('Error',        s:red,     'NONE',    'bold')

call s:hi('DiffAdd',      s:green,   s:hl,      'NONE')
call s:hi('DiffChange',   s:yellow,  s:hl,      'NONE')
call s:hi('DiffDelete',   s:red,     s:hl,      'NONE')
call s:hi('DiffText',     s:blue,    s:hl,      'NONE')
