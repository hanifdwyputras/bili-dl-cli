import Piscina from 'piscina';
import { fetchResource } from './fetch.js';
import { mergeAudioAndVideo } from './merger.js';

if (!Piscina.isWorkerThread)
  throw new Error("You aren't able to use this file!");

export async function downloadAndCombine({ audioUrl, videoUrl, filePath }) {
  return await new Promise((resolve, reject) => {
    const [audio, video] = [fetchResource(audioUrl), fetchResource(videoUrl)];
    const stream = mergeAudioAndVideo({ audio, video }, filePath);

    stream.on('error', reject).on('exit', () => resolve(filePath));
  });
}
