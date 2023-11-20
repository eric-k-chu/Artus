import { ClientError } from './index.js';

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
  userId: number;
  videoId: string;
  likes: number;
  caption: string;
  videoUrl: string;
  thumbnailUrl: string;
  uploadedAt: number;
};

export type VideoDetails = Video & User;

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
