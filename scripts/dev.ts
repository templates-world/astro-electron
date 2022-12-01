import { execute } from '$shared/process';
import chokidar from 'chokidar';
import esbuild from 'esbuild';
import waitOn from 'wait-on';

async function buildProcess() {
  return esbuild
    .build({
      entryPoints: ['src/process/index.ts'],
      watch: true,
      platform: 'node',
      outdir: 'dist',
      format: 'cjs',
    })
    .catch(() => process.exit(1));
}

async function main() {
  execute('astro dev');

  await waitOn({ resources: ['http://localhost:3000'] });

  chokidar.watch('./src/process/**/*.ts').on('all', async () => {
    await buildProcess();
    await execute('pnpm start');
  });
}

process.env.NODE_ENV = 'development';

main();
