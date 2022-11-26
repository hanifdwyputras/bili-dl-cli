import { Got } from '@bilibili-dl/util';

/** @typedef {import('@bilibili-dl/util').ItemTransformed} ItemTransformed */

/**
 * Fetch resource
 * @param {string} resourceUrl Resource URL
 * @return {Got.Request}
 */
export const fetchResource = (resourceUrl) =>
  Got.got.stream(resourceUrl, {
    headers: {
      Origin: 'https://www.bilibili.tv',
      Referer: 'https://www.bilibili.tv',
    },
    timeout: {
      socket: 0,
    },
    enableUnixSockets: true,
  });
