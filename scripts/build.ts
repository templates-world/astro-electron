import { execute } from '$shared/process';
import { deleteAsync } from 'del';
import esbuild from 'esbuild';

async function main() {
  await deleteAsync(['dist', 'out']);
  await execute('astro build');
  await esbuild
    .build({
      entryPoints: ['src/process/index.ts'],
      platform: 'node',
      outdir: 'dist',
      format: 'cjs',
    })
    .catch(() => process.exit(1));
  await execute('pnpm electron:build');
}

main();
