import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';

const ffmpegPath = ffmpegStatic ?? '';
if (!ffmpegPath) {
  throw new Error('ffmpeg  binaries are needed to run fluent-ffmpeg');
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

// Converts videos to gif and mp4
export function convertVideos(
  files: Express.Multer.File[],
): Promise<ConvertedVideos[]> {
  console.log('Converion starting now...');
  const convertedVideos: Promise<ConvertedVideos>[] = [];
  for (let i = 0; i < files.length; i++) {
    const { filename, path, originalname } = files[i];
    convertedVideos.push(convertToGifAndMp4(filename, path, originalname));
  }
  return Promise.all(convertedVideos);
}
