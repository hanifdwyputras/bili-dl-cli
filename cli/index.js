import { Option } from 'commander';

/** @typedef {import('commander').Command} Program */

import { downloadService, searchService } from './services/index.js';

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

  // download
  program
    .command('download')
    .description('Download Bilibili.TV Videos from an URL(s)')
    .argument('<urls...>', 'An URL(s) to download')
    .option('-tf, --to-file [path]', 'File path destination')
    .requiredOption('-f, --folder <path>', 'Folder path destination')
    .action(downloadService);
};
