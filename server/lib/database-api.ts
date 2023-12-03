export type Auth = {
  username: string;
  password: string;
};

export type Tag = {
  tagId: number;
  name: string;
};

export type Video = {
  caption: string;
  likes: number;
  thumbnailUrl: string;
  uploadedAt: string;
  userId: number;
  username: string;
  videoId: number;
  videoUrl: string;
  tags?: string | string[];
};

export type VideoForm = {
  caption: string;
  tags: string[];
};

export function removeDuplicates(videos: Video[]): Video[] {
  const reduced = videos.reduce((acc, video) => {
    const existingVideo = acc.get(video.videoId);
    if (existingVideo) {
      existingVideo.tags.push(video.tags);
    } else {
      acc.set(video.videoId, {
        ...video,
        tags: video.tags ? [video.tags] : [],
      });
    }
    return acc;
  }, new Map());

  return Array.from(reduced.values());
}

export function validateVideoId(videoId: number): boolean {
  return !Number.isInteger(videoId);
}
