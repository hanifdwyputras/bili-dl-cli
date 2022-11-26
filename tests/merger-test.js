import { downloadMedia, fetchPlayUrl, findQuery } from '../lib/index.js';

const randomValue = (arr) => arr[Math.floor(Math.random() * arr.length)];

(async () => {
  const res = await findQuery('Tie Me Down', (item) => item.type === 'video');
  const randomItem = randomValue(res);

  const itemPlay = await fetchPlayUrl(randomItem.id, randomItem.type, 'en_US');
  if (typeof itemPlay === 'string') {
    throw new Error(itemPlay);
  }

  itemPlay.audios = itemPlay.audios.filter((a) => a.url.length);
  itemPlay.videos = itemPlay.videos.filter((v) => v.url.length);

  const flPath = await downloadMedia(
    {
      audioUrl: randomValue(itemPlay.audios.map((a) => a.url)),
      videoUrl: randomValue(itemPlay.videos.map((v) => v.url)),
    },
    randomItem.id.toString().concat('.mp4')
  );

  console.log(flPath);
})();
