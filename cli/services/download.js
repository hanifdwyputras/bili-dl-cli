import fs from 'node:fs/promises';
import path from 'node:path';
import { getBtvID } from '@bilibili-dl/util';

import { downloadMedia, fetchPlayUrl } from '../../lib/index.js';

async function getID(url) {
  const id = getBtvID(url);
  if (!id) return Promise.reject(new Error("Couldn't resolve the ID!"));
  return Promise.resolve([
    !!id.seasonId ? id.seasonId : id.videoId,
    !!id.seasonId,
  ]);
}

export const downloadService = async (urls, options) => {
  if (urls.length === 1 && options.toFile) {
    const id = await getID(urls[0]).catch((e) => ({ err: e.message }));
    if (!Array.isArray(id)) {
      console.error("Couldn't download the video because", id.err);
      return;
    } else {
      const playurl = await fetchPlayUrl(
        id[0],
        id[1] ? 'anime' : 'video',
        'id_ID'
      );
      if (typeof playurl === 'string' || !playurl) {
        console.error(
          'Couldnt download the video because',
          playurl ?? 'INTERNAL_ERROR'
        );
        return;
      }
      // TODO: ask video resolution

      if (!options.toFile.endsWith('.mp4'))
        options.toFile = options.toFile.concat('.mp4');

      // TODO: add progressbar here
      console.log('Downloading your video');
      const locatedPath = await downloadMedia(
        {
          audioUrl: playurl.audios[0].url,
          videoUrl: playurl.videos.filter((v) => v.url.length)[0].url,
        },
        path.resolve(options.folder, options.toFile)
      );
      console.log('Download success, see', locatedPath);
      return;
    }
  }

  // multi url download
  const stat = await fs.stat(options.folder).catch(() => undefined);

  if (!stat?.isDirectory()) {
    console.log('Make sure the directory is available!');
    return;
  }

  console.log('Soon!');
};
