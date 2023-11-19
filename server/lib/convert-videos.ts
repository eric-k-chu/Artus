import ffmpeg, { ffprobe } from 'fluent-ffmpeg';
import fs from 'node:fs';
import ffmpegStatic from 'ffmpeg-static';

const ffmpegStaticPath = ffmpegStatic ?? '';
if (!ffmpegStaticPath)
  throw new Error('ffmpeg binaries are needed to run fluent-ffmpeg');

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
  let duration: number | undefined;

  ffprobe(path, (err, metadata) => {
    if (err) throw new Error(err);
    duration = metadata.format.duration;
  });

  if (!duration) throw new Error('undefined video duration.');

  const startTime = duration < 3 ? 0 : duration / 2;
  const endTime = duration < 3 ? duration : 3;

  return new Promise((resolve, reject) => {
    ffmpeg(path)
      .setFfmpegPath(ffmpegStaticPath)
      .setStartTime(startTime)
      .duration(endTime)
      .format('gif')
      .fps(10)
      .on('start', () => {
        console.log('converting to gif...');
      })
      .on('error', (err) => {
        reject(err);
      })
      .on('end', () => {
        ffmpeg(path)
          .setFfmpegPath(ffmpegStaticPath)
          .setDuration(60)
          .videoCodec('libx265')
          .addOptions('-crf 28')
          .format('mp4')
          .on('start', () => {
            console.log('converting to mp4...');
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
  console.log('Converion starting now...');
  const convertedVideos: Promise<ConvertedVideos>[] = [];
  for (let i = 0; i < files.length; i++) {
    const { filename, path, originalname } = files[i];
    convertedVideos.push(convertToGifandMp4(filename, path, originalname));
  }
  return await Promise.all(convertedVideos);
}
