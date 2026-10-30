import { existsSync, readFileSync } from 'node:fs';
import { join, extname } from 'node:path';
import { createServer } from 'node:http';
import chalk from 'chalk';
import { loadState } from '../utils/state.js';

const MIME: Record<string, string> = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon'
};

export async function runBoard(root: string, opts: { port?: string; open?: boolean }): Promise<void> {
  const port = parseInt(opts.port ?? '4173', 10);
  const __dirname = new URL('.', import.meta.url).pathname;
  const candidates = [
    join(__dirname, '..', '..', '..', 'board', 'dist'),
    join(process.cwd(), 'packages', 'board', 'dist'),
    join(root, 'node_modules', 'pocket-dev', 'packages', 'board', 'dist'),
    join(root, '.pocket-dev', 'board')
  ];
  const distDir = candidates.find(d => existsSync(join(d, 'index.html')));
  if (!distDir) {
    console.log(chalk.yellow('Board not built. Run `npm run build:board` first (from repo root).'));
    return;
  }
  const server = createServer((req, res) => {
    const url = (req.url ?? '/').split('?')[0];
    if (url === '/tasks.json') {
      const state = loadState(root);
      const tasks = (state?.tasks ?? []).map(t => ({
        id: t.id,
        name: t.name,
        description: t.description,
        phase: t.phase,
        priority: t.priority,
        status: t.status,
        tags: t.tags,
        openItems: t.openItems,
        nextSteps: t.nextSteps,
        blockedReason: t.blockedReason,
        estimatedHours: t.estimatedHours,
        actualHours: t.actualHours
      }));
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(tasks));
      return;
    }
    let fileUrl = url === '/' ? '/index.html' : url;
    const file = join(distDir, fileUrl);
    if (!existsSync(file)) {
      const index = join(distDir, 'index.html');
      if (existsSync(index)) {
        res.setHeader('Content-Type', 'text/html');
        res.end(readFileSync(index));
        return;
      }
      res.statusCode = 404;
      res.end('Not found');
      return;
    }
    const ext = extname(file);
    res.setHeader('Content-Type', MIME[ext] ?? 'application/octet-stream');
    res.end(readFileSync(file));
  });
  server.listen(port, () => {
    console.log(chalk.green(`Pocket Dev board running at http://localhost:${port}`));
    console.log(chalk.gray('Press Ctrl+C to stop.\n'));
  });
  if (opts.open) {
    try {
      const { exec } = await import('node:child_process');
      const cmd = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
      exec(`${cmd} http://localhost:${port}`);
    } catch {}
  }
}
