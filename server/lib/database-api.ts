import { ClientError, type ConvertedVideos } from './index.js';
import pg from 'pg';

export type Auth = {
  username: string;
  password: string;
};

export type User = {
  userId: number;
  username: string;
  hashedPassword: string;
};

export type UpdatedVideo = {
  caption: string;
  tags: string;
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

export function generateInsertUserVideosSql(
  convertedVids: ConvertedVideos[],
  userId: number | undefined,
): string {
  if (!userId) throw new Error('userId is undefined');

  const values: string[] = [];
  const sql = `INSERT
       INTO "videos" ("userId", "likes", "caption", "videoUrl", "thumbnailUrl")
     VALUES `;

  for (let i = 0; i < convertedVids.length; i++) {
    const { videoUrl, thumbnailUrl, originalname } = convertedVids[i];
    values.push(
      `($<${userId}>, $<${0}>, $<${originalname}>, $<${videoUrl}>, $<${thumbnailUrl}>)`,
    );
  }
  return sql + values.join(',') + ' RETURNING *';
}

export async function removeExistingTags(
  tags: string,
  db: pg.Pool,
): Promise<string[]> {
  const tagNames = tags.split(',');
  const newTags: string[] = [];
  for (let i = 0; i < tagNames.length; i++) {
    const sql = `SELECT "name" FROM "tags" WHERE "name" = $1`;
    const result = await db.query(sql, [tagNames[i]]);
    if (!result.rows) newTags.push(tagNames[i]);
  }
  return newTags;
}

export function generateInsertTagsSql(tags: string[]): string {
  if (!tags) throw new Error('tags cannot be undefined');

  const sql = `INSERT INTO "users" ("name") VALUES `;

  for (let i = 0; i < tags.length; i++) {
    tags[i] = `($<${tags[i]}>)`;
  }
  return sql + tags.join(',') + ' RETURNING "name"';
}

export function checkUserId(
  paramUserId: number,
  jwtUserId: number | undefined,
): void {
  if (!Number.isInteger(paramUserId))
    throw new ClientError(404, 'userId in params is not a valid integer');
  if (!jwtUserId) throw new ClientError(401, 'verification failed.');
  if (paramUserId !== jwtUserId)
    throw new ClientError(401, 'userId and jwt userId does not match.');
}

export function validateTags(tags: string): void {
  if (tags && tags.includes(' ')) {
    throw new ClientError(
      404,
      'tags must be a single word and must be separated by a comma',
    );
  }
}

export function validateUpdatedVideo(
  videoId: number,
  caption: string,
  tags: string,
): void {
  if (!Number.isInteger(videoId))
    throw new ClientError(404, 'videoId in params is not a valid integer');
  if (!caption) throw new ClientError(404, 'caption cannot be empty.');
  validateTags(tags);
}
