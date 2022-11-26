import { Option } from 'commander';

/** @typedef {import('commander').Command} Program */

import { searchService } from './services/index.js';

/**
 * Handle commander
 * @param {Program} program Commander program
 * @return {Promise<void>}
 */
export const handleProgram = async (program) => {
  // search
  program
    .command('search')
    .description('Search videos/anime via query')
    .argument('<queries...>', 'A query want to search')
    .addOption(
      new Option('-v, --video', 'Just show the videos or filter non-anime')
    )
    .addOption(
      new Option('-a, --anime', 'Just show the anime or filter animes')
    )
    .action(searchService);
};
