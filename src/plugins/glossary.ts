import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { defineHastPlugin } from 'satteri';
import { parse as parseYaml } from 'yaml';
import { glossarySchema } from '../schemas/glossary.ts';

const glossaryDir = new URL('../content/glossary/', import.meta.url);

const normalizeTerm = (text: string) => text.trim().toLowerCase().replace(/[\s-]+/g, '-');

/**
 * Indexes `src/content/glossary/*.md` by file name, `term`, and `aliases`
 * (normalized), each pointing at the definition (the file body).
 */
function loadGlossary(): Map<string, string> {
  const index = new Map<string, string>();
  if (!existsSync(glossaryDir)) return index;

  for (const file of readdirSync(glossaryDir).filter((name) => name.endsWith('.md'))) {
    const source = readFileSync(new URL(file, glossaryDir), 'utf8');
    const [, frontmatter = '', body = ''] = source.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/) ?? [];
    const parsed = glossarySchema.safeParse(parseYaml(frontmatter));
    if (!parsed.success) throw new Error(`glossary/${file}: ${parsed.error.message}`);

    const { term, aliases } = parsed.data;
    for (const name of [file.replace(/\.md$/, ''), term, ...aliases]) {
      index.set(normalizeTerm(name), body.trim());
    }
  }

  return index;
}

/**
 * Wraps `*term*` (an `<em>` whose whole text is a glossary entry) in a
 * focusable `<span class="term" data-tip="definition">`. Markdown never
 * produces `<em>` inside code, so code is untouched.
 */
export function glossaryPlugin() {
  const glossary = loadGlossary();

  return defineHastPlugin({
    name: 'glossary',
    element: {
      filter: ['em'],
      visit(node, ctx) {
        const [text] = node.children;
        if (node.children.length !== 1 || text?.type !== 'text') return;

        const definition = glossary.get(normalizeTerm(text.value));
        if (!definition) return;

        ctx.wrapNode(node, {
          type: 'element',
          tagName: 'span',
          properties: { className: ['term'], tabIndex: 0, dataTip: definition },
          children: [],
        });
      },
    },
  });
}
