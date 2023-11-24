set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."users" (
  "userId" serial PRIMARY KEY,
  "username" text NOT NULL UNIQUE,
  "hashedPassword" text NOT NULL,
  "createdAt" timestamptz(6) NOT NULL DEFAULT (now())
);

CREATE TABLE "public"."videos" (
  "userId" integer,
  "videoId" serial PRIMARY KEY,
  "likes" integer NOT NULL DEFAULT 0,
  "caption" text NOT NULL,
  "videoUrl" text NOT NULL,
  "thumbnailUrl" text NOT NULL,
  "uploadedAt" timestamptz(6) NOT NULL DEFAULT (now())
);

CREATE TABLE "public"."tags" (
  "tagId" serial PRIMARY KEY,
  "name" text NOT NULL
);

CREATE TABLE "public"."likedVideos" (
  "userId" integer,
  "videoId" integer,
  PRIMARY KEY ("userId", "videoId")
);

CREATE TABLE "public"."videoTags" (
  "videoId" integer,
  "tagId" integer,
  PRIMARY KEY ("videoId", "tagId")
);

ALTER TABLE "videos" ADD FOREIGN KEY ("userId") REFERENCES "users" ("userId");

ALTER TABLE "likedVideos" ADD FOREIGN KEY ("userId") REFERENCES "users" ("userId");

ALTER TABLE "likedVideos" ADD FOREIGN KEY ("videoId") REFERENCES "videos" ("videoId") ON Delete cascade;

ALTER TABLE "videoTags" ADD FOREIGN KEY ("videoId") REFERENCES "videos" ("videoId") ON Delete cascade;

ALTER TABLE "videoTags" ADD FOREIGN KEY ("tagId") REFERENCES "tags" ("tagId");
