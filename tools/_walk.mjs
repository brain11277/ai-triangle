/* Shared file walker. Skips .git and diagrams/png. */
import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const SKIP = new Set(['.git', 'node_modules', '.venv', 'png']);

export function walk(dir, exts, acc = []) {
  for (const name of readdirSync(dir)) {
    if (SKIP.has(name)) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, exts, acc);
    else if (!exts || exts.some((e) => name.endsWith(e))) acc.push(p);
  }
  return acc;
}
