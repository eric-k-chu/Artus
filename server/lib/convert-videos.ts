import fs from 'node:fs';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';
import ffprobeStatic from 'ffprobe-static';

const ffmpegPath = ffmpegStatic ?? '';
const ffprobePath = ffprobeStatic.path ?? '';
if (!ffmpegPath && !ffprobePath) {
  throw new Error(
    'ffmpeg and ffprobe binaries are needed to run fluent-ffmpeg',
  );
}

export async function logDuration(path: string) {
  let duration: number | undefined;

  ffmpeg(path)
    .setFfprobePath(ffprobePath)
    .ffprobe(async (err, metadata) => {
      if (err) throw new Error(err);
      duration = metadata.format.duration;
      console.log(duration);
    });
  console.log(duration);
}

export type ConvertedVideos = {
  thumbnailUrl: string;
  videoUrl: string;
  originalname: string;
};

async function convertToGifAndMp4(
  filename: string,
  path: string,
  originalname: string,
): Promise<ConvertedVideos> {
  return new Promise((resolve, reject) => {
    ffmpeg(path)
      .setFfmpegPath(ffmpegPath)
      .setDuration(3)
      .complexFilter([
        {
          filter: 'fps',
          options: 10,
          inputs: '0:v',
          outputs: 'a',
        },
        {
          filter: 'scale',
          options: 'w=320:h=-1',
          inputs: 'a',
          outputs: 'b',
        },
        {
          filter: 'split',
          inputs: 'b',
          outputs: ['c', 'd'],
        },
        {
          filter: 'palettegen',
          inputs: 'c',
          outputs: 'p',
        },
        {
          filter: 'paletteuse',
          inputs: ['d', 'p'],
        },
      ])
      .format('gif')
      .on('start', () => console.log('Converting to gif...'))
      .on('error', (err) => reject(err))
      .on('end', () => {
        ffmpeg(path)
          .setFfmpegPath(ffmpegPath)
          .setDuration(60)
          .videoCodec('libx264')
          .addOption('-crf 24')
          .format('mp4')
          .on('start', () => console.log('Converting to mp4...'))
          .on('error', (err) => reject(err))
          .on('end', () => {
            fs.unlinkSync(path);
            resolve({
              thumbnailUrl: `/videos/${filename.split('.')[0]}.gif`,
              videoUrl: `/videos/${filename.split('.')[0]}.mp4`,
              originalname,
            });
          })
          .save(`./public/videos/${filename.split('.')[0]}.mp4`);
      })
      .save(`./public/videos/${filename.split('.')[0]}.gif`);
  });
}

export async function convertVideos(
  files: Express.Multer.File[],
): Promise<ConvertedVideos[]> {
  console.log('Converion starting now...');
  const convertedVideos: Promise<ConvertedVideos>[] = [];
  for (let i = 0; i < files.length; i++) {
    const { filename, path, originalname } = files[i];
    convertedVideos.push(convertToGifAndMp4(filename, path, originalname));
  }
  return await Promise.all(convertedVideos);
}
