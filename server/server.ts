import 'dotenv/config';
import express from 'express';
import pg from 'pg';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import format from 'pg-format';
import {
  ClientError,
  authMiddleware,
  errorMiddleware,
  uploadsMiddleware,
  convertVideos,
  type Auth,
  type User,
  type Video,
  type ConvertedVideos,
  type Tag,
} from './lib/index.js';

const hashKey = process.env.TOKEN_SECRET;
if (!hashKey) throw new Error('TOKEN_SECRET not found in .env');

const connectionString =
  process.env.DATABASE_URL ||
  `postgresql://${process.env.RDS_USERNAME}:${process.env.RDS_PASSWORD}@${process.env.RDS_HOSTNAME}:${process.env.RDS_PORT}/${process.env.RDS_DB_NAME}`;
const db = new pg.Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

const app = express();

const reactStaticDir = new URL('../client/dist', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;

app.use(express.static(reactStaticDir));
app.use(express.static(uploadsStaticDir));
app.use(express.json());

// INSERT User
app.post('/api/auth/register', async (req, res, next) => {
  try {
    const { username, password } = req.body as Partial<Auth>;
    if (!username || !password) {
      throw new ClientError(400, 'Username and password are required fields.');
    }

    // const checkSql = `SELECT *
    //                     FROM "users"
    //                    WHERE "username" = $1`;
    // const checkUser = await db.query<User>(checkSql, [username]);
    // if (checkUser.rows[0]) {
    //   throw new ClientError(409, 'Username already exists.');
    // }

    const hashedPassword = await argon2.hash(password);
    const sql = `
      INSERT INTO "users" ("username", "hashedPassword")
           VALUES ($1, $2)
          ON CONFLICT ("username") DO NOTHING
           RETURNING "userId", "username"`;
    const result = await db.query<User>(sql, [username, hashedPassword]);
    const user = result.rows[0];
    if (!user) throw new ClientError(409, 'This username already exists.');
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

// SELECT User
app.post('/api/auth/sign-in', async (req, res, next) => {
  try {
    const { username, password } = req.body as Partial<Auth>;
    if (!username || !password) {
      throw new ClientError(401, 'Invalid login.');
    }
    const sql = `
      SELECT "userId",
             "hashedPassword"
        FROM "users"
       WHERE "username" = $1
    `;
    const result = await db.query<User>(sql, [username]);
    const user = result.rows[0];

    if (!user)
      throw new ClientError(404, 'These credentials do not match our records.');

    const { userId, hashedPassword } = user;
    if (!(await argon2.verify(hashedPassword, password))) {
      throw new ClientError(401, 'Invalid login.');
    }
    const payload = { userId, username };
    const token = jwt.sign(payload, hashKey);
    res.json({ token, user: payload });
  } catch (err) {
    next(err);
  }
});

// SELECT Videos
app.get('/api/videos/all', async (req, res, next) => {
  try {
    const sql = 'SELECT * FROM "videos"';
    const result = await db.query<Video>(sql);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

// SELECT Video by ID
app.get('/api/videos/:videoId', async (req, res, next) => {
  try {
    const videoId = Number(req.params.videoId);
    if (!Number.isInteger(videoId)) {
      throw new ClientError(400, 'videoId must be a positive integer.');
    }
    const sql = `SELECT
                    "videoId",
                    "likes",
                    "caption",
                    "uploadedAt",
                    "videoUrl",
                    "thumbnailUrl",
                    "userId",
                    "username",
                    "name" as "tags"
                   FROM "videos"
              LEFT JOIN "videoTags" USING ("videoId")
              LEFT JOIN "tags" USING ("tagId")
                   JOIN "users" USING ("userId")
                  WHERE "videoId" = $1`;
    const result = await db.query(sql, [videoId]);
    const video = result.rows[0];
    if (!video) {
      throw new ClientError(404, `Cannot find video with id: ${videoId}`);
    }
    video.tags = video.tags ? result.rows.map((n) => n.tags) : null;
    res.json(video);
  } catch (err) {
    next(err);
  }
});

// SELECT User Videos
app.get('/api/videos/', authMiddleware, async (req, res, next) => {
  try {
    const sql = `SELECT
                  "videoId",
                  "likes",
                  "caption",
                  "uploadedAt",
                  "videoUrl",
                  "thumbnailUrl",
                  "userId",
                  "username",
                  "name" as "tags"
                   FROM "videos"
              LEFT JOIN "videoTags" USING ("videoId")
              LEFT JOIN "tags" USING ("tagId")
                   JOIN "users" USING ("userId")
                  WHERE "videos"."userId" = $1
               ORDER BY "uploadedAt"`;
    const result = await db.query(sql, [req.user?.userId]);
    const videos = result.rows;

    if (videos.length < 1) {
      res.json(videos);
    } else {
      const reducedVideos = videos.reduce((acc, video) => {
        const exisitingVideo = acc[video.videoId];
        if (exisitingVideo) {
          exisitingVideo.tags.push(video.tags);
        } else {
          acc[video.videoId] = {
            ...video,
            tags: video.tags ? [video.tags] : null,
          };
        }
        return acc;
      }, {});

      res.json(Object.values(reducedVideos));
    }
  } catch (err) {
    next(err);
  }
});

// INSERT User Video
app.post(
  '/api/videos',
  authMiddleware,
  uploadsMiddleware.array('videos'),
  async (req, res, next) => {
    try {
      if (!req.files) throw new ClientError(400, 'no file field in request');

      const files = req.files as Express.Multer.File[];
      const convertedVideos: ConvertedVideos[] = await convertVideos(files);

      console.log('Inserting into database...');
      const values: (number | string | undefined)[][] = [];
      for (const vids of convertedVideos) {
        const { videoUrl, thumbnailUrl, originalname } = vids;
        values.push([
          req.user?.userId,
          0,
          originalname,
          videoUrl,
          thumbnailUrl,
        ]);
      }

      const sql = format(
        `INSERT INTO "videos" ("userId", "likes", "caption", "videoUrl", "thumbnailUrl")
                               VALUES %L RETURNING *`,
        values,
      );
      const result = await db.query<Video>(sql);
      console.log('Sending to client...');
      res.status(201).json(result.rows);
    } catch (err) {
      next(err);
    }
  },
);

// UPDATE User video
app.put('/api/videos/:videoId', authMiddleware, async (req, res, next) => {
  try {
    const videoId = Number(req.params.videoId);
    const { caption, tags } = req.body as Partial<Video>;
    if (!Number.isInteger(videoId)) {
      throw new ClientError(400, 'videoId must be a positive integer.');
    }
    if (!caption) throw new ClientError(400, 'Caption cannot be empty.');

    const sql = `UPDATE "videos"
                    SET "caption" = $1
                  WHERE "videoId" = $2
                  RETURNING *`;
    const result = await db.query<Video>(sql, [caption, videoId]);
    const video = result.rows[0];
    if (!video) {
      throw new ClientError(404, `Video with id ${videoId} does not exist.`);
    }

    if (!tags) {
      video.tags = [null] as unknown as string[];
      res.status(201).json(video);
    } else {
      const deleteSQL = `DELETE FROM "videoTags" WHERE "videoId" = $1`;
      await db.query(deleteSQL, [videoId]);

      const tagValues = tags.map((n) => [n]);
      const insertSQL = format(
        `INSERT INTO "tags" ("name") VALUES %L RETURNING *`,
        tagValues,
      );

      const tagResult = await db.query(insertSQL);
      const videoTags: Tag[] = tagResult.rows;

      const vidTagValues = videoTags.map((n) => [videoId, n.tagId]);
      const vidTagSql = format(
        `INSERT INTO "videoTags" ("videoId", "tagId")
          VALUES %L RETURNING *`,
        vidTagValues,
      );
      await db.query(vidTagSql);
      video.tags = videoTags.map((n) => n.name);
      res.status(201).json(video);
    }
  } catch (err) {
    next(err);
  }
});

// DELETE User video
app.delete(
  '/api/dashboard/:videoId',
  authMiddleware,
  async (req, res, next) => {
    try {
      const videoId = Number(req.params.videoId);
      if (!Number.isInteger(videoId)) {
        throw new ClientError(400, 'videoId must be a positive integer.');
      }
      const result = await db.query(
        'DELETE FROM "videos" WHERE "videoId" = $1 RETURNING "videoUrl"',
        [videoId],
      );
      const videoUrl = result.rows[0].videoUrl;
      console.log('Delete video file once depoloyed', videoUrl);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  },
);

/**
 * Serves React's index.html if no api route matches.
 *
 * Implementation note:
 * When the final project is deployed, this Express server becomes responsible
 * for serving the React files. (In development, the Vite server does this.)
 * When navigating in the client, if the user refreshes the page, the browser will send
 * the URL to this Express server instead of to React Router.
 * Catching everything that doesn't match a route and serving index.html allows
 * React Router to manage the routing.
 */
app.get('*', (req, res) => res.sendFile(`${reactStaticDir}/index.html`));

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
