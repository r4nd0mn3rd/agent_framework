import { join, basename, resolve } from 'node:path';
import chalk from 'chalk';
import ora from 'ora';
import { ensureFrameworkDirs, defaultState, saveState, loadState } from '../utils/state.js';
import { checkDependencies, printDeps, allRequiredPresent } from '../utils/deps.js';
import { askIntegration, setupIntegration, printUsage, type Integration } from '../utils/integrations.js';

export async function runInit(target: string, opts: { yes?: boolean; integration?: string }): Promise<void> {
  const spinner = ora('Initializing Pocket Dev framework...').start();
  ensureFrameworkDirs(target);

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

  // Determine integration
  let integration: Integration = (opts.integration as Integration) ?? 'none';
  if (!opts.integration && !opts.yes) {
    integration = await askIntegration();
  }
  if (integration && integration !== 'none') {
    const created = setupIntegration(target, integration);
    console.log(chalk.green(`\n✓ Integration set up: ${integration}`));
    for (const c of created) console.log(chalk.gray(`   created ${c}`));
  } else {
    console.log(chalk.gray('\nIntegration: skipped (none)'));
  }

  console.log(chalk.cyan('\nNext steps:'));
  console.log('  1. Read GETTING-STARTED.md');
  console.log('  2. Run `pocket-dev status` to see project overview');
  console.log('  3. Run `pocket-dev board` to launch the agile board');
  console.log('  4. Run `pocket-dev validate` to check framework alignment');

  printUsage(integration);
}
