#!/usr/bin/env node
import { Command } from 'commander';
import { handleProgram } from '../cli/index.js';

const program = new Command('bili-cli');

program
  .name('bili-cli')
  .description(
    'A Command-Line Interface service to download bilibili.tv videos'
  )
  .version('1.0.0');

handleProgram(program);

program.parse();
