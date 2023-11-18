import ffmpeg from 'fluent-ffmpeg';
import fs from 'node:fs';
import ffmpegStatic from 'ffmpeg-static';

export type ConvertedVideos = {
  thumbnailUrl: string;
  videoUrl: string;
  originalname: string;
};

async function convertToGifandMp4(
  filename: string,
  path: string,
  originalname: string,
): Promise<ConvertedVideos> {
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
            const converted = {
              thumbnailUrl: `/videos/${filename}-compressed.gif`,
              videoUrl: `/videos/${filename}-compressed.mp4`,
              originalname,
            };
            resolve(converted);
          })
          .save(`./public/videos/${filename}-compressed.mp4`);
      })
      .save(`./public/videos/${filename}-compressed.gif`);
  });
}

export async function convertVideos(
  files: Express.Multer.File[],
): Promise<ConvertedVideos[]> {
  const convertedVideos: Promise<ConvertedVideos>[] = [];
  for (let i = 0; i < files.length; i++) {
    const { filename, path, originalname } = files[i];
    convertedVideos.push(convertToGifandMp4(filename, path, originalname));
  }
  return await Promise.all(convertedVideos);
}
