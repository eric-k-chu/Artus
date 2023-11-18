import { type ConvertedVideos } from './convert-videos';

export type Auth = {
  username: string;
  password: string;
};

export type User = {
  userId: number;
  username: string;
  hashedPassword: string;
};

export type Video = {
  userId: string;
  videoId: string;
  likes: number;
  caption: string;
  videoUrl: string;
  thumbnailUrl: string;
  uploadedAt: number;
};

export function queryVideos(
  convertedVids: ConvertedVideos[],
  userId: number | undefined,
): string {
  if (!userId) throw new Error('userId is undefined');

  const values: string[] = [];
  const sql = `INSERT
       INTO "users" ("userId", "likes", "caption", "videoUrl", "thumbnailUrl")
     VALUES `;

  for (let i = 0; i < convertedVids.length; i++) {
    const { videoUrl, thumbnailUrl, originalname } = convertedVids[i];
    values.push(
      `($<${userId}>, $<${0}>, $<${originalname}>, $<${videoUrl}>, $<${thumbnailUrl}>)`,
    );
  }
  return sql + values.join(',') + ' RETURNING *';
}
