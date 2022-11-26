import childProcess from 'node:child_process';
import ffmpegPath from 'ffmpeg-static';

/** @typedef {import('@bilibili-dl/util').Got.Request} GotRequest */
/**
 *
 * @param {{ audio: GotRequest, video: GotRequest }} param0 Audio, and video resources
 * @param {string} filePath Converted file
 * @param {string[]} args Additional FFMPeg Args
 * @return {childProcess.ChildProcess}
 */
export const mergeAudioAndVideo = ({ audio, video }, filePath, args = []) => {
  if (!ffmpegPath?.length) throw new Error('Missing FFMPeg!');

  const ffmpegStream = childProcess.spawn(
    ffmpegPath,
    [
      '-y',
      '-i',
      'pipe:0',
      '-i',
      'pipe:1',
      // -
      '-c:v',
      'copy',
      '-c:a',
      'aac',
      '-shortest',
      '-preset',
      'veryfast',
      '-vcodec',
      'libx264',
      '-crf',
      '20',
      filePath,
    ].concat(args),
    {
      stdio: ['pipe', 'pipe', 'ignore'],
    }
  );

  audio.pipe(ffmpegStream.stdio[0]);
  video.pipe(ffmpegStream.stdio[1]);

  return ffmpegStream;
};
