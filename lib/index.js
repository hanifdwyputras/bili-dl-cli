import * as Bilibili from '@bilibili-dl/core';
import Piscina from 'piscina';

export const jobWorker = new Piscina({
  filename: new URL('./worker.js', import.meta.url).href,
});

/**
 * Find query
 * @param {string} query Search query
 * @param {Function} filter Results filter function
 * @return {Promise<ItemTransformed[]>}
 */
export const findQuery = async (query, filter = () => true) => {
  const results = await Bilibili.searchQuery(query, 'en_US');
  return results.filter((f) => filter(f));
};

/**
 * Download, and combine video and audio
 * @param {{ videoUrl: string, audioUrl: string }} param0 An object contains videoUrl, and audioUrl
 * @param {string} filePath File destination
 * @return {Promise<string>}
 */
export const downloadMedia = async ({ audioUrl, videoUrl }, filePath) =>
  jobWorker.run(
    {
      videoUrl,
      audioUrl,
      filePath,
    },
    { name: 'downloadAndCombine' }
  );

export const fetchPlayUrl = Bilibili.getPlayUrl;
export const fetchMeta = Bilibili.getMeta;

export * from './fetch.js';
