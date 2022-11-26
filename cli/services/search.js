import { findQuery } from '../../lib/index.js';
import ttyTable from 'tty-table';

export const searchService = async (str, options) => {
  const results = await findQuery(str.join(' '));

  const tables = ttyTable(
    [
      {
        value: '#',
      },
      {
        value: 'ID',
      },
      {
        value: 'Title',
      },
      {
        value: 'Duration',
      },
      {
        value: 'URL',
      },
      {
        value: 'Type',
      },
    ],
    results
      .filter((r) => [Object.keys(options).includes(r.type)])
      .map((r, index) => [index + 1, r.id, r.title, r.duration, r.url, r.type])
  );

  console.log(tables.render());
};
