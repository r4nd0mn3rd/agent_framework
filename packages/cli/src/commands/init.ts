import { join, basename, resolve } from 'node:path';
import { execSync } from 'node:child_process';
import chalk from 'chalk';
import ora from 'ora';
import { ensureFrameworkDirs, defaultState, saveState, loadState } from '../utils/state.js';
import { checkDependencies, printDeps, allRequiredPresent } from '../utils/deps.js';

export async function runInit(target: string, opts: { yes?: boolean }): Promise<void> {
  const spinner = ora('Initializing Pocket Dev framework...').start();
  ensureFrameworkDirs(target);

  // Dependency check
  const deps = checkDependencies();
  spinner.stop();
  printDeps(deps);
  if (!allRequiredPresent(deps)) {
    console.log(chalk.red('\nAborting: required dependencies missing. Run `pocket-dev deps` for details.'));
    process.exit(1);
  }

  const projectName = basename(resolve(target)) || 'pocket-dev-project';
  if (!loadState(target)) {
    saveState(target, defaultState(projectName));
    console.log(chalk.green(`\n✓ State initialized for project: ${projectName}`));
  } else {
    console.log(chalk.yellow('\n✓ Existing state preserved.'));
  }

  // Try to run the framework install script if present in source tree
  // (npm-installed users get docs via package files already)
  console.log(chalk.cyan('\nNext steps:'));
  console.log('  1. Read GETTING-STARTED.md');
  console.log('  2. Run `pocket-dev status` to see project overview');
  console.log('  3. Run `pocket-dev board` to launch the agile board');
  console.log('  4. Run `pocket-dev validate` to check framework alignment');
}
