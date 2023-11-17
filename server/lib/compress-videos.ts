import ffmpeg from 'fluent-ffmpeg';
import fs from 'node:fs';
import ffmpegStatic from 'ffmpeg-static';

export type CompressedVideos = {
  thumbUrl: string;
  videoUrl: string;
};

export async function compressVideos(
  filename: string,
  path: string,
): Promise<CompressedVideos> {
  return new Promise((resolve, reject) => {
    ffmpeg(path)
      .setFfmpegPath(ffmpegStatic || '')
      .setStartTime(1)
      .duration(3)
      .format('gif')
      .fps(10)
      .on('start', () => {
        console.log('compressing...');
      })
      .on('error', (err) => {
        reject(err);
      })
      .on('end', () => {
        ffmpeg(path)
          .setFfmpegPath(ffmpegStatic || '')
          .setDuration(60)
          .videoCodec('libx265')
          .addOptions('-crf 28')
          .format('mp4')
          .on('start', () => {
            console.log('compressing...');
          })
          .on('error', (err) => {
            reject(err);
          })
          .on('end', () => {
            fs.unlinkSync(path);
            const compressed = {
              thumbUrl: `/videos/${filename}-compressed.gif`,
              videoUrl: `/videos/${filename}-compressed.mp4`,
            };
            resolve(compressed);
          })
          .save(`./public/videos/${filename}-compressed.mp4`);
      })
      .save(`./public/videos/${filename}-compressed.gif`);
  });
}
