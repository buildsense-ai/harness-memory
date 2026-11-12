import { build } from 'esbuild';
import { readFileSync, writeFileSync } from 'node:fs';

await build({
  entryPoints: ['frontend/workbench.js'],
  outfile: 'public/workbench/workbench.js',
  bundle: true,
  format: 'iife',
  minify: true,
  target: 'es2022',
  legalComments: 'eof',
});

const output = readFileSync('public/workbench/workbench.js', 'utf8');
writeFileSync('public/workbench/workbench.js', output.replace(/[ \t]+$/gm, '').replace(/^ +(?=\t)/gm, ''));
