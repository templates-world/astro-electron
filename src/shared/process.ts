import { spawn } from 'node:child_process';

export async function execute(command: string) {
  return new Promise((resolve, reject) => {
    const args = command.split(' ');
    const child = spawn(args[0], args.slice(1), {
      cwd: process.cwd(),
      stdio: 'inherit',
      shell: true,
    });
    child.addListener('close', resolve);
    child.addListener('exit', resolve);
    child.addListener('error', reject);
  });
}
