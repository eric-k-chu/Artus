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
  tags: any;
};

export type Tag = {
  tagId: number;
  name: string;
};

export type VideoDetails = Video & User;
